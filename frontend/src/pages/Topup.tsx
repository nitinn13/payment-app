import React, { useState } from 'react';
import axios from 'axios';
import { loadRazorpayScript } from '../utils/razorpay-utils'

interface TopUpProps {
  onTopUpSuccess: () => void;
}

const TopUp: React.FC<TopUpProps> = ({ onTopUpSuccess }) => {
  const [amount, setAmount] = useState<number>(100); // Default ₹100
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [transactionId, setTransactionId] = useState<string | null>(null);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 10) { // Minimum ₹10 as per your API
      setAmount(value);
    }
  };

  const handleTopUp = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // 1. Create Razorpay order
      const orderResponse = await axios.post('http://localhost:3000/transaction/create-razorpay-order', { amount }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const { orderId, transactionId: txId } = orderResponse.data;
      setTransactionId(txId);

      // 2. Load Razorpay script if not already loaded
      await loadRazorpayScript();

      // 3. Open Razorpay checkout
      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'Your Wallet TopUp',
        description: 'Wallet TopUp',
        order_id: orderId,
        handler: async (response: any) => {
          // Handle payment success
          try {
            await verifyPayment(response, txId);
          } catch (err) {
            setError('Payment verification failed');
            console.error(err);
          }
        },
        prefill: {
          // You can prefill customer details if available
        },
        notes: {
          transactionId: txId
        },
        theme: {
          color: '#3399cc'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

      rzp.on('payment.failed', (response: any) => {
        setError(`Payment failed: ${response.error.description}`);
        setLoading(false);
      });

    } catch (err) {
      setError('Failed to create payment order');
      console.error(err);
      setLoading(false);
    }
  };

  const verifyPayment = async (response: any, txId: string) => {
    try {
      await axios.post('/transactions/verify-razorpay-payment', {
        paymentId: response.razorpay_payment_id,
        orderId: response.razorpay_order_id,
        signature: response.razorpay_signature,
        transactionId: txId,
        amount: amount
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSuccess(true);
      onTopUpSuccess(); // Notify parent component
    } catch (err) {
      setError('Payment verification failed');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="top-up-container p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Wallet TopUp</h2>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      {success ? (
        <div className="text-center">
          <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
            TopUp successful! ₹{amount} has been added to your wallet.
          </div>
          <button
            onClick={() => {
              setSuccess(false);
              setTransactionId(null);
            }}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Make Another TopUp
          </button>
        </div>
      ) : (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="amount">
              Amount (₹)
            </label>
            <input
              type="number"
              id="amount"
              min="10"
              step="10"
              value={amount}
              onChange={handleAmountChange}
              className="w-full p-2 border rounded"
            />
            <p className="text-xs text-gray-500 mt-1">Minimum amount: ₹10</p>
          </div>
          
          <button
            onClick={handleTopUp}
            disabled={loading}
            className={`w-full py-2 px-4 rounded ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'} text-white`}
          >
            {loading ? 'Processing...' : 'TopUp Wallet'}
          </button>
        </>
      )}
      
      {transactionId && (
        <div className="mt-4 text-sm text-gray-500">
          Transaction ID: {transactionId}
        </div>
      )}
    </div>
  );
};

export default TopUp;