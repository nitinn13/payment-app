import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Send from './pages/Send';
import Profile from './pages/Profile';
import Transactions from './pages/Transactions';
import LandingPage from './pages/LandingPage';
import TransactionDetailsPage from './pages/TransactionDetailsPage';
import Contacts from './pages/Contacts';
import TopUp from './pages/Topup';

const App: React.FC = () => {
  // Add the required callback function
  const handleTopUpSuccess = () => {
    // Add your success logic here
    console.log('TopUp successful!');
    // Typically you might want to:
    // - Refresh balance
    // - Navigate to another page
    // - Show success notification
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/send" element={<Send />} />
          <Route path="/me" element={<Profile />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/transactions/my-transactions/:id" element={<TransactionDetailsPage />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/send-money" element={<Send />} />
          <Route 
            path="/topup" 
            element={<TopUp onTopUpSuccess={handleTopUpSuccess} />} 
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;