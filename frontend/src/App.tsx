import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';


const App = () => {
  return (
    <>

      <BrowserRouter>

        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/My-transactions" element={<Transactions />} />
          <Route path="/send-money" element={<Send/>} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App