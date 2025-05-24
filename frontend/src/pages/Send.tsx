import axios from 'axios';
import React , { useState } from 'react'

const Send = () => {
  const [upiId, setUpiId] = useState("");
  const [amount, setAmount] = useState("");
  return (
    <>
    <div>Send</div>
    <input type="text" onChange={e => setUpiId(e.target.value)} placeholder='enter upi id' />
    <input type="number" placeholder='enter amount' onChange={e => setAmount(e.target.value)} />
    <button
    onClick={async () => {
      const response = await fetch('http://localhost:3000/transaction/send-upi-internal',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            receiverUpiId: upiId,
            amount: Number(amount)
          })
        }
      )
      const data = await response.json()
      console.log(data)
    }}
    >send money</button>
    </>
  )
}

export default Send;