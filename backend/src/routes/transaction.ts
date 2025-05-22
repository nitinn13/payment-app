import express, { Router, Request, Response } from "express";
import z from "zod";
import { prisma } from "../prisma";
import userMiddleware from "../middlewares/user";

const transactionRouter: Router = Router();

transactionRouter.post("/send", userMiddleware, async (req: Request, res: Response) => {
  try {
    const schema = z.object({
      receiverId: z.string().uuid(),
      amount: z.number().positive(),
      description: z.string().optional()
    });

    const result = schema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const { receiverId, amount, description } = result.data;
    const senderId = req.userId;

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
    await prisma.$transaction([
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
          amount,
          description,
          status: "success",
          type: "wallet_transfer",
        },
      })
    ]);

    res.status(200).json({ message: "Transaction successful" });

  } catch (e) {
    console.error("Transaction Error:", e);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default transactionRouter;
