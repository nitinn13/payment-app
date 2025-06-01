import express, { Router, Request, Response } from "express";
import z from "zod";
import { prisma } from "../prisma";
import userMiddleware from "../middlewares/user";
import { createRazorpayOrder, verifyPayment, capturePayment } from "../services/payment";

const transactionRouter: Router = Router();
interface AuthenticatedRequest extends Request {
  userId?: string;
}
interface Transaction {
  senderId: string | null;
  receiverId: string | null;
  amount: number;
  createdAt: Date;
  receiverUpiId: string | null;
  senderUpiId: string | null;
  id: string;
}

transactionRouter.post("/send-upi-internal", userMiddleware, async (req: Request, res: Response) => {
    try {
        const schema = z.object({
            receiverUpiId: z.string(), 
            amount: z.number().positive(),
            description: z.string().optional()
        });

        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({ message: "Invalid input" });
        }

        const { receiverUpiId, amount, description } = result.data;
        const senderId = req.userId;

        const receiverUser = await prisma.user.findFirst({
            where: { upiId: receiverUpiId },
            select: { id: true }
        });

        if (!receiverUser) {
            return res.status(404).json({ message: "Recipient with this UPI ID not found on our platform" });
        }

        const receiverId = receiverUser.id;

        if (senderId === receiverId) {
            return res.status(400).json({ message: "Cannot send money to yourself" });
        }

        const [senderWallet, receiverWallet] = await Promise.all([
            prisma.wallet.findUnique({ where: { userId: senderId } }),
            prisma.wallet.findUnique({ where: { userId: receiverId } }),
        ]);

        if (!senderWallet || !receiverWallet) {
            return res.status(404).json({ message: "Sender or receiver wallet not found" });
        }

        if (senderWallet.balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }
        const senderUpiId = await prisma.user.findUnique({
            where: { id: senderId },
            select: { upiId: true }
        });
        const [_, __, newTransaction] = await prisma.$transaction([
            prisma.wallet.update({
                where: { userId: senderId },
                data: { balance: { decrement: amount } },
            }),
            prisma.wallet.update({
                where: { userId: receiverId },
                data: { balance: { increment: amount } },
            }),
            prisma.transaction.create({
                data: {
                    senderId,
                    receiverId,
                    senderUpiId : senderUpiId?.upiId,
                    amount,
                    description,
                    status: "success",
                    type: "wallet_transfer",
                    receiverUpiId: receiverUpiId
                },
                select: { id: true }
            })
        ]);

        res.status(200).json({ message: "Money sent successfully (internal UPI)", transactionId: newTransaction.id });


    } catch (e) {
        console.error("Internal UPI Transfer Error:", e);
        res.status(500).json({ message: "Something went wrong during internal UPI transfer" });
    }
});


transactionRouter.post("/create-razorpay-order", userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
  try {
    const schema = z.object({
      amount: z.number().positive().min(10), // Minimum ₹10
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid amount" });
    }

    const { amount } = result.data;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Create a transaction record first
    const transaction = await prisma.transaction.create({
      data: {
        senderId: userId,
        amount,
        status: "pending",
        type: "razorpay_topup",
        description: "Wallet topup via Razorpay",
      },
    });

    // Create Razorpay order
    const order = await createRazorpayOrder(amount, userId);

    // Update transaction with Razorpay order ID
    await prisma.transaction.update({
      where: { id: transaction.id },
      data: { razorpayId: order.id },
    });

    res.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      transactionId: transaction.id,
    });

  } catch (e) {
    console.error("Razorpay order creation error:", e);
    res.status(500).json({ message: "Failed to create Razorpay order" });
  }
});


transactionRouter.post("/verify-razorpay-payment", userMiddleware, async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      paymentId: z.string(),
      orderId: z.string(),
      signature: z.string(),
      transactionId: z.string(),
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    const { paymentId, orderId, signature, transactionId } = result.data;
    const userId = req.userId;

    // Verify payment with Razorpay
    const isValid = await verifyPayment(paymentId, orderId, signature);
    if (!isValid) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    // Capture payment (optional - can be done automatically by Razorpay)
    await capturePayment(paymentId, parseFloat(req.body.amount));

    // Get transaction details
    const transaction = await prisma.transaction.findUnique({
      where: { id: transactionId, senderId: userId }
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Update transaction status
    await prisma.$transaction([
      prisma.transaction.update({
        where: { id: transactionId },
        data: { 
          status: "success",
          razorpayId: orderId
        }
      }),
      prisma.wallet.update({
        where: { userId },
        data: { balance: { increment: transaction.amount } }
      })
    ]);

    res.json({ success: true, message: "Payment verified and wallet updated" });

  } catch (e) {
    console.error("Payment verification error:", e);
    res.status(500).json({ message: "Payment verification failed" });
  }
});

transactionRouter.get("/my-transactions", userMiddleware, async (req: AuthenticatedRequest, res: Response) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const transactions = await prisma.transaction.findMany({
            where: {
                OR: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
            },
            select: {
                senderId: true,
                receiverId: true,
                amount: true,
                createdAt: true,
                receiverUpiId: true,
                senderUpiId: true,
                id: true,
                status: true,
                type: true
            },
            orderBy: {
                createdAt: 'desc' 
            }
        });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({
                message: "No transactions found",
            });
        }

        const enhancedTransactions = transactions.map((transaction: {
            senderId: string | null;
            receiverId: string | null;
            amount: number;
            createdAt: Date;
            receiverUpiId: string | null;
            senderUpiId: string | null;
            id: string;
            status: string;
            type: string;
        }) => {
            let transactionType: 'sent' | 'received' | 'topup';
            if (transaction.type === 'razorpay_topup') {
                transactionType = 'topup';
            } else if (transaction.senderId === userId) {
                transactionType = 'sent';
            } else {
                transactionType = 'received';
            }
            return {
                ...transaction,
                transactionType,
            };
        });

        res.status(200).json({
            transactions: enhancedTransactions,
        });
    } catch (e) {
        console.error("Transaction Error:", e);
        res.status(500).json({ message: "Something went wrong" });
    }
});

transactionRouter.get("/my-transactions/:id", userMiddleware, async (req: Request, res: Response) => {
    try {
        const { userId } = req;
        const { id } = req.params;
         const transaction = await prisma.transaction.findUnique({
            where: {
                id,
                OR: [
                    { senderId: userId },
                    { receiverId: userId },
                ],
            },
        });
        res.status(200).json({
            transaction
        });
    } catch (e) {
        console.error("Transaction Error:", e);
        res.status(500).json({ message: "Something went wrong" });
    }
});
export default transactionRouter;