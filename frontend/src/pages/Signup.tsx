import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [name, setname] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");

    return (
        
        <div className='flex flex-col m-3 gap-6'>
            <div className='text-md '>Signup</div>
            <div>
                <div className='text-sm border-2 border-black font-medium text-left py-2 '>
                    <input 
                    onChange={e =>{
                        setname(e.target.value)
                    }}
                    type="text" placeholder='enter name' className='w-full px-2 py-1' />
                </div>
            </div>
             <div>
                <div className='text-sm border-2 border-black font-medium text-left py-2'>
                    <input
                     onChange={e =>{
                        setusername(e.target.value)
                    }}
                     type="text" placeholder='enter username' className='w-full px-2 py-1' />
                </div>
            </div>
            <div>
                <div className='text-sm border-2 border-black font-medium text-left py-1'>
                    <input 
                    onChange={e =>{
                        setemail(e.target.value)
                    }}
                    type="text" placeholder='enter email' className='w-full px-2 py-1' />
                </div>
            </div>
            <div>
                <div className='text-sm border-2 border-black font-medium text-left py-2'>
                    <input
                     onChange={e =>{
                        setpassword(e.target.value)
                    }}
                     type="text" placeholder='enter password' className='w-full px-2 py-1' />
                </div>
            </div>
            <button 
                onClick={async () => {
                    const response = await axios.post('http://localhost:3000/user/signup',{
                        name,
                        username,
                        email,
                        password
                    })
                    localStorage.setItem('token', response.data.token)
                }}
            className='border-2 border-black p-3 '>
                button
            </button>
           
        </div>
    )
}

export default Signup