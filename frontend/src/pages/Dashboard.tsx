import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [balance, setBalance] = useState(0); 
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Mock user data for demo
  const mockUsers = [
    { id: 1, name: 'John Doe', upiId: 'john@paytm', avatar: 'JD', status: 'online' },
    { id: 2, name: 'Sarah Wilson', upiId: 'sarah@gpay', avatar: 'SW', status: 'offline' },
    { id: 3, name: 'Mike Johnson', upiId: 'mike@phonepe', avatar: 'MJ', status: 'online' },
    { id: 4, name: 'Emily Davis', upiId: 'emily@paytm', avatar: 'ED', status: 'online' },
    { id: 5, name: 'David Brown', upiId: 'david@gpay', avatar: 'DB', status: 'offline' },
  ];

  const getUsers = async () => {
    try {

      const response = await fetch('http://localhost:3000/user/all-users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      setUsers(data.users);


    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setIsLoading(false);
  };
  const getBalance = async () => {
    const response = await fetch('http://localhost:3000/user/my-balance',
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


  useEffect(() => {
    getUsers();
    getBalance();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.upiId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const quickActions = [
    { icon: '💸', title: 'Send Money', desc: 'Transfer funds instantly', color: 'from-blue-500 to-blue-600' },
    { icon: '📱', title: 'Mobile Recharge', desc: 'Top-up your phone', color: 'from-green-500 to-green-600' },
    { icon: '💡', title: 'Pay Bills', desc: 'Electricity, gas & more', color: 'from-yellow-500 to-yellow-600' },
    { icon: '🎯', title: 'Investments', desc: 'Grow your money', color: 'from-purple-500 to-purple-600' },
  ];

  const recentTransactions = [
    { id: 1, name: 'Coffee Shop', amount: -45.50, type: 'debit', time: '2 hours ago' },
    { id: 2, name: 'Sarah Wilson', amount: +200.00, type: 'credit', time: '1 day ago' },
    { id: 3, name: 'Netflix Subscription', amount: -15.99, type: 'debit', time: '2 days ago' },
    { id: 4, name: 'Salary Credit', amount: +3500.00, type: 'credit', time: '1 week ago' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-purple-600">PayFlow</h1>
              <div className="hidden md:flex space-x-6">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'overview' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'
                    }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('transactions')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'transactions' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'
                    }`}
                >
                  Transactions
                </button>
                <button
                  onClick={() => setActiveTab('contacts')}
                  className={`px-3 py-2 rounded-lg transition-colors ${activeTab === 'contacts' ? 'bg-purple-100 text-purple-700' : 'text-gray-600 hover:text-purple-600'
                    }`}
                >
                  Contacts
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5-5-5h5v-12" />
                </svg>
              </button>
              <button className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Balance Card */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-200 text-sm font-medium">Total Balance</p>
                  <h2 className="text-4xl font-bold mt-2">${balance.toLocaleString()}</h2>
                  <p className="text-purple-200 text-sm mt-1">Available to spend</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-white/20 hover:bg-white/90 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white text-xl mb-3`}>
                  {action.icon}
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{action.title}</h4>
                <p className="text-sm text-gray-600">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Recent Transactions</h3>
                <button className="text-purple-600 hover:text-purple-700 font-medium text-sm">
                  View All
                </button>
              </div>

              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 rounded-xl transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                        }`}>
                        {transaction.type === 'credit' ? '↓' : '↑'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{transaction.name}</p>
                        <p className="text-sm text-gray-500">{transaction.time}</p>
                      </div>
                    </div>
                    <div className={`text-right ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}>
                      <p className="font-semibold">
                        {transaction.type === 'credit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contacts */}
          <div>
            <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Send Money To</h3>

              {/* Search */}
              <div className="relative mb-6">
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-white/50"
                />
                <svg className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>

              {/* Users List */}
              <div className="space-y-3">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-gray-500 mt-2">Loading contacts...</p>
                  </div>
                ) : (
                  filteredUsers.map((user) => (
                    <button
                      key={user.id}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50/50 rounded-xl transition-colors text-left"
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.upiId}</p>
                      </div>
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;