import React, { useState, useEffect } from 'react'

const Balance = () => {
    const[balance, setBalance] = useState(0);


    useEffect(() => {
        const getBalance = async () => {
            const response = await fetch('https://localhost:https://payment-app-backend-dulq.onrender.com/user/my-balance',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            const data = await response.json()
            console.log(data)
            setBalance(data.balance.balance)
        }
        getBalance()
    }, [])
  return (
    <div>Balance is {balance}</div>
  )
}

export default Balance