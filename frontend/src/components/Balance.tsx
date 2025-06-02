import React, { useState, useEffect } from 'react';

interface BalanceResponse {
  balance: {
    balance: number;
  };
}

const Balance: React.FC = () => {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const getBalance = async () => {
      try {
        const response = await fetch(
          'https://payment-app-backend-dulq.onrender.com/user/my-balance',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token') || ''}`
            }
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch balance');
        }

        const data: BalanceResponse = await response.json();
        setBalance(data.balance.balance);
      } catch (error) {
        console.error('Error fetching balance:', error);
        // You might want to set some error state here
      }
    };

    getBalance();
  }, []);

  return (
    <div className="balance-container">
      Balance is ₹{balance.toFixed(2)}
    </div>
  );
};

export default Balance;