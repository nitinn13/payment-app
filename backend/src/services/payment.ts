import Razorpay from 'razorpay';
import { env } from '../env';

// Create a typed Razorpay instance
interface IRazorpay {
  orders: {
    create(options: any): Promise<any>;
  };
  payments: {
    capture(paymentId: string, amount: number, currency: string): Promise<any>;
  };
  utils: {
    validateWebhookSignature(body: string, signature: string, secret: string): boolean;
  };
}

// Cast the Razorpay instance to our custom interface
const razorpayInstance: IRazorpay = new Razorpay({
  key_id: env.RAZORPAY_KEY_ID,
  key_secret: env.RAZORPAY_KEY_SECRET,
}) as unknown as IRazorpay;

interface RazorpayOrderResponse {
  id: string;
  amount: number;
  currency: string;
  receipt?: string;
  status: string;
  created_at: number;
}

export const createRazorpayOrder = async (amount: number, userId: string, currency: string = 'INR'): Promise<RazorpayOrderResponse> => {
  const options = {
    amount: amount * 100,
    currency,
    receipt: `receipt_${Date.now()}`,
    notes: {
      userId,
    },
  };

  return razorpayInstance.orders.create(options);
};

export const verifyPayment = async (paymentId: string, orderId: string, signature: string): Promise<boolean> => {
  try {
    const generatedSignature = razorpayInstance.utils.validateWebhookSignature(
      `${orderId}|${paymentId}`,
      signature,
      env.RAZORPAY_KEY_SECRET
    );
    return generatedSignature;
  } catch (error) {
    console.error('Payment verification failed:', error);
    return false;
  }
};

export const capturePayment = async (paymentId: string, amount: number) => {
  try {
    const response = await razorpayInstance.payments.capture(paymentId, amount * 100, 'INR');
    return response;
  } catch (error) {
    console.error('Payment capture failed:', error);
    throw error;
  }
};