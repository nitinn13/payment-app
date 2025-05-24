import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  return (
    <div>
      <div className='text-md '>Login</div>
      <div>
        <div className='text-sm border-2 border-black font-medium text-left py-2'>
          <input
            onChange={e => {
              setemail(e.target.value)
            }}
            type="text" placeholder='enter email' className='w-full px-2 py-1' />
        </div>
      </div>
      <div>
        <div className='text-sm border-2 border-black font-medium text-left py-2'>
          <input
            onChange={e => {
              setpassword(e.target.value)
            }}
            type="text" placeholder='enter password' className='w-full px-2 py-1' />
        </div>
      </div>
      <button
        onClick={async () => {
          const response = await axios.post('http://localhost:3000/user/login', {
            email,
            password
          })
          localStorage.setItem('token', response.data.token)
          navigate("/dashboard")
        }}
        className='border-2 border-black p-3 '>
        button
      </button>
    </div>
  )
}

export default Login