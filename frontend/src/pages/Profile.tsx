import React, {useState, useEffect} from 'react'

const Profile = () => {
    const [data, setData] = useState({});

    useEffect(() => {
        const getData = async () => {
            const response = await fetch('http://localhost:3000/user/me',
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
            setData(data.user)
        }
        getData()
    }, [])
  return (
    <div>
        {data.name}
        <p>{data.upiId}</p>
        <p>{data.email}</p>
        <p>{data.username}</p>
        <p>{data.createdAt}</p>

    </div>
  )
}

export default Profile