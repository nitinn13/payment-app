import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Plus, Send, Smartphone, Zap, AlertCircle, TrendingUp, Search, ChevronRight, User, Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getUsers, getTransactions, getBalance, getMyDetails } from '../api/api'; 
import Header from '../components/Header';

// Define types for your data
interface User {
  id: string;
  name: string;
  upiId: string;
  status?: 'online' | 'offline';
  avatar?: string;
}

interface Transaction {
  id: string;
  transactionType: 'sent' | 'received';
  receiverUpiId: string;
  senderUpiId: string;
  amount: number;
  category: string;
  createdAt: string;
}

interface UserDetails {
  name: string;
  email?: string;
  upiId?: string;
  // Add other user details properties as needed
}

interface QuickAction {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  color: string;
  bgColor: string;
  link: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [me, setMe] = useState<UserDetails>({ name: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [balance, setBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [balanceVisible, setBalanceVisible] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null); 

      try {
        const [usersData, balanceData, myDetailsData, transactionsData] = await Promise.all([
          getUsers(),
          getBalance(),
          getMyDetails(),
          getTransactions()
        ]);

        setUsers(usersData as User[]);
        setBalance(balanceData as number);
        setMe(myDetailsData as UserDetails);
        setTransactions(transactionsData as Transaction[]);
      } catch (err: any) {
        setError(err.message || 'Failed to fetch dashboard data');
        console.error(err);
        setUsers([]);
        setBalance(0);
        setMe({ name: '' });
        setTransactions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.upiId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   navigate('/login');
  // };

  const quickActions: QuickAction[] = [
    { icon: Send, title: 'Send Money', desc: 'Transfer funds instantly', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', link: '/send' },
    { icon: Smartphone, title: 'Mobile Recharge', desc: 'Top-up your phone', color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', link: '/dashboard' },
    { icon: Zap, title: 'Pay Bills', desc: 'Electricity, gas & more', color: 'from-yellow-500 to-yellow-600', bgColor: 'bg-yellow-50', link: '/dashboard'},
    { icon: TrendingUp, title: 'Investments', desc: 'Grow your money', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', link: '/dashboard' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
        {/* Header Skeleton */}
        <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">PayFlow</h1>
                  <p className="text-xs text-gray-500">Financial Dashboard</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
                <div className="w-px h-6 bg-gray-300"></div>
                <div className="w-16 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Loading Animation Center */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8">
            {/* Main Loading Spinner */}
            <div className="relative">
              <div className="w-20 h-20 border-4 border-purple-200 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">P</span>
                </div>
              </div>
            </div>

            {/* Loading Text */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Loading your dashboard</h2>
              <p className="text-gray-500">Please wait while we fetch your financial data...</p>
            </div>

            {/* Loading Steps */}
            <div className="flex space-x-8 text-sm">
              <div className="flex items-center space-x-2 text-green-600">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span>Authenticating</span>
              </div>
              <div className="flex items-center space-x-2 text-purple-600">
                <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
                <span>Loading balance</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                <span>Fetching contacts</span>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4 shadow-lg">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Dashboard</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50">
      <Header/>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section & Balance */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 rounded-2xl p-8 text-white relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-medium text-purple-100">Good evening, {me.name}</h2>
                  <p className="text-purple-200 text-sm mt-1">Welcome back to your dashboard</p>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors">
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <p className="text-purple-200 text-sm font-medium">Total Balance</p>
                    <button
                      onClick={() => setBalanceVisible(!balanceVisible)}
                      className="p-1 hover:bg-white/20 rounded-md transition-colors"
                    >
                      {balanceVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <h3 className="text-3xl font-bold">
                    {balanceVisible ? `$${balance.toLocaleString()}` : '••••••••'}
                  </h3>
                  <p className="text-purple-200 text-sm mt-1">Available to spend</p>
                  <button
                    onClick={() => navigate('/topup')}
                    className="mt-2 text-sm font-medium text-white bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
                  >
                    Top Up
                  </button>
                </div>
                
                <div className="text-right">
                  <div className="bg-white/20 rounded-lg p-3">
                    <p className="text-xs text-purple-200">This Month</p>
                    <p className="text-lg font-semibold">+$1,234</p>
                    <p className="text-xs text-green-300">↗ 12% increase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-900">Quick Actions</h3>
            <button className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center space-x-1">
              <span>View More</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <button
                onClick={() => navigate(action.link)}
                key={index}
                className={`${action.bgColor} hover:bg-opacity-80 rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-200 transform hover:scale-105 hover:shadow-lg group`}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  <action.icon className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-1 text-left">{action.title}</h4>
                <p className="text-sm text-gray-600 text-left">{action.desc}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Recent Transactions</h3>
                    <p className="text-sm text-gray-500 mt-1">Your latest financial activity</p>
                  </div>
                  <button 
                    onClick={() => navigate('/transactions')}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center space-x-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="divide-y divide-gray-100">
                {transactions.slice(0, 3).map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => navigate(`/transactions/my-transactions/${transaction.id}`)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          transaction.transactionType === 'sent' 
                            ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600' 
                        }`}>
                          {transaction.transactionType === 'sent' ? 
                            <ArrowUpRight className="w-5 h-5" /> :
                            <ArrowDownLeft className="w-5 h-5" /> 
                          }
                        </div>
                        <div>
                          {
                            transaction.transactionType === 'sent' ? 
                              <p className="font-semibold text-gray-900">{transaction.receiverUpiId}</p> :
                              <p className="font-semibold text-gray-900">{transaction.senderUpiId}</p>
                          }
                          <div className="flex items-center space-x-2 mt-1">
                            <p className="text-sm text-gray-500">{transaction.category}</p>
                            <span className="text-gray-300">•</span>
                            <p className="text-sm text-gray-500 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className={`text-right ${
                        transaction.transactionType === 'sent' ? 'text-red-600' : 'text-green-600'
                      }`}>
                        <p className="font-bold text-lg">
                          {transaction.transactionType === 'sent' ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Send */}
          <div>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900">Quick Send</h3>
                <p className="text-sm text-gray-500 mt-1">Send money to your contacts</p>
              </div>

              <div className="p-6">
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search contacts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-gray-50 focus:bg-white"
                  />
                </div>

                {/* Users List */}
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredUsers.slice(0, 6).map((user) => (
                    <button
                      key={user.id}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group"
                      onClick={() => navigate(`/send?upiId=${user.upiId}`)}
                    >
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.avatar || <User className="w-6 h-6" />}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{user.name}</p>
                        <p className="text-sm text-gray-500 truncate">{user.upiId}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                    </button>
                  ))}
                </div>

                {filteredUsers.length > 6 && (
                  <button 
                    className="w-full mt-4 py-2 text-purple-600 hover:text-purple-700 font-medium text-sm border border-purple-200 hover:border-purple-300 rounded-lg transition-colors"
                    onClick={() => navigate('/contacts')}
                  >
                    View All Contacts ({filteredUsers.length})
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;