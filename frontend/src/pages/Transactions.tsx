import React, { useState, useEffect } from 'react'

const Transactions = () => {
    const [data, setData] = useState([]);
    useEffect(()=>{
        const getData = async () => {
            const response = await fetch('http://localhost:3000/transaction/my-transactions',
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
            setData(data.transactions)
        }
        getData()
    },[])
    console.log(data)

  return (
    <>
    <div>Transactions</div>
    {data.map(transaction => (
        <div key={transaction.id}>
            <p>{transaction.amount}</p>
            <p>{transaction.description}</p>
            <p>{transaction.transactionType}</p>
            <p>{transaction.receiverUpiId}</p>
            <p>{transaction.createdAt}</p>
        </div>
    ))}
    </>
    
  )
}

export default Transactions