import React, { useState, useEffect } from 'react'
import Balance from '../components/Balance';

const Dashboard = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch('http://localhost:3000/user/all-users',
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
    setUsers(data.users)
  }

  useEffect(() => {
    getUsers()
  }, [])
  return (
    <>
      <Balance />
      <div className='flex flex-col m-3 gap-6'>
        <div className='text-md '>Dashboard</div>

        <input type="text" placeholder='search' className='w-full px-2 py-1' />
        {users.map(user => (
          <div key={user.id} className='border-black border-2'>
            <h1>{user.name}</h1>
            <p>{user.upiId}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default Dashboard