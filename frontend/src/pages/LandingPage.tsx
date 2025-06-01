import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  CreditCard,
  Smartphone,
  TrendingUp,
  ChevronDown,
  Menu,
  X,
  Send,
  Receipt,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Settings,
  LogOut,
  Bell,
  Search,
  Filter,
  Plus,
  Eye,
  EyeOff
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PayFlowApp = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [transactions] = useState([
    { id: 1, type: 'sent', amount: 1500, to: 'nitin@upi', date: '2024-05-24', status: 'completed' },
    { id: 2, type: 'received', amount: 2300, from: 'sarah@upi', date: '2024-05-23', status: 'completed' },
    { id: 3, type: 'sent', amount: 800, to: 'mike@upi', date: '2024-05-22', status: 'pending' },
    { id: 4, type: 'received', amount: 4200, from: 'company@upi', date: '2024-05-21', status: 'completed' }
  ]);

  const Header = () => (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              PayFlow
            </div>
          </div>

          <nav className="hidden md:flex space-x-8">
            {['home', 'features', 'about', 'contact'].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`text-sm font-medium transition-colors duration-200 ${currentPage === page
                  ? 'text-violet-600'
                  : 'text-gray-600 hover:text-violet-600'
                  }`}
              >
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </button>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Dashboard
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={() => {
                    navigate('/login');
                  }}
                  className="text-gray-600 hover:text-violet-600 px-4 py-2 text-sm font-medium transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/signup');
                  }}
                  className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                  Sign Up
                </button>
              </div>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );

  const HomePage = () => (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight">
                  Send Money
                  <span className="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                    Instantly
                  </span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Experience the future of digital payments with our secure, fast, and user-friendly platform. Send money to anyone, anywhere, anytime.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => navigate('/signup')}
                  className="group bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-violet-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </button>
                <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-2xl text-lg font-semibold hover:border-violet-300 hover:text-violet-600 transition-all duration-300">
                  Learn More
                </button>
              </div>

              <div className="flex items-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Shield className="mr-2" size={16} />
                  Bank-level Security
                </div>
                <div className="flex items-center">
                  <Zap className="mr-2" size={16} />
                  Instant Transfers
                </div>

              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl transform -rotate-6 scale-105 opacity-10"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Quick Transfer</h3>
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-10 h-10 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        J
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">nitin@upi</div>
                        <div className="text-sm text-gray-500">Last sent: ₹2,500</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-800 mb-2">₹5,000</div>
                      <div className="text-sm text-gray-500">Amount to send</div>
                    </div>
                  </div>

                  <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200">
                    Send Money
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose PayFlow?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology and designed for the modern user experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description: "Advanced encryption and multi-layer security protocols protect your transactions"
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Send money instantly with our optimized payment processing system"
              },
              {
                icon: Smartphone,
                title: "UPI Integration",
                description: "Seamlessly integrated with UPI for maximum compatibility and convenience"
              },
              {
                icon: TrendingUp,
                title: "Smart Analytics",
                description: "Track your spending patterns and get insights into your financial habits"
              },
              {
                icon: Users,
                title: "Social Payments",
                description: "Split bills, share expenses, and send money to friends effortlessly"
              },
              {
                icon: CreditCard,
                title: "Multiple Methods",
                description: "Support for cards, bank accounts, and digital wallets"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-violet-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-violet-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            {[
              { number: "10M+", label: "Active Users" },
              { number: "₹500Cr+", label: "Transaction Volume" },
              { number: "99.9%", label: "Uptime" },
              { number: "24/7", label: "Support" }
            ].map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold">{stat.number}</div>
                <div className="text-violet-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );

  const DashboardPage = () => (
    <div className="pt-16 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
            <p className="text-gray-600 mt-1">Manage your payments and transactions</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button className="p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Bell size={20} className="text-gray-600" />
            </button>
            <button
              onClick={() => {
                setUser(null);
                setCurrentPage('home');
              }}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: 'Total Balance', value: '₹45,250', change: '+12%', icon: DollarSign, color: 'green' },
            { title: 'This Month', value: '₹8,420', change: '+8%', icon: TrendingUp, color: 'blue' },
            { title: 'Pending', value: '₹1,200', change: '-2%', icon: Clock, color: 'yellow' },
            { title: 'Completed', value: '156', change: '+18%', icon: CheckCircle, color: 'purple' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className={`text-sm ${stat.color === 'green' ? 'text-green-600' : stat.color === 'blue' ? 'text-blue-600' : stat.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'} mt-1`}>
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`p-3 rounded-xl ${stat.color === 'green' ? 'bg-green-100' : stat.color === 'blue' ? 'bg-blue-100' : stat.color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                  <stat.icon className={`${stat.color === 'green' ? 'text-green-600' : stat.color === 'blue' ? 'text-blue-600' : stat.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'}`} size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { title: 'Send Money', icon: Send, color: 'violet' },
              { title: 'Request Money', icon: Receipt, color: 'blue' },
              { title: 'Pay Bills', icon: CreditCard, color: 'green' },
              { title: 'Add Money', icon: Plus, color: 'purple' }
            ].map((action, index) => (
              <button
                key={index}
                className="flex flex-col items-center p-4 rounded-xl border-2 border-gray-100 hover:border-violet-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className={`p-3 rounded-xl mb-2 ${action.color === 'violet' ? 'bg-violet-100 group-hover:bg-violet-200' : action.color === 'blue' ? 'bg-blue-100 group-hover:bg-blue-200' : action.color === 'green' ? 'bg-green-100 group-hover:bg-green-200' : 'bg-purple-100 group-hover:bg-purple-200'} transition-colors`}>
                  <action.icon className={`${action.color === 'violet' ? 'text-violet-600' : action.color === 'blue' ? 'text-blue-600' : action.color === 'green' ? 'text-green-600' : 'text-purple-600'}`} size={24} />
                </div>
                <span className="text-sm font-medium text-gray-700">{action.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Transactions</h2>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Search size={20} />
                </button>
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <Filter size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="divide-y divide-gray-100">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-xl ${transaction.type === 'sent' ? 'bg-red-100' : 'bg-green-100'}`}>
                      {transaction.type === 'sent' ? (
                        <Send className={`${transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'}`} size={20} />
                      ) : (
                        <Receipt className={`${transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'}`} size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {transaction.type === 'sent' ? `To ${transaction.to}` : `From ${transaction.from}`}
                      </p>
                      <p className="text-sm text-gray-500">{transaction.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === 'sent' ? 'text-red-600' : 'text-green-600'}`}>
                      {transaction.type === 'sent' ? '-' : '+'}₹{transaction.amount.toLocaleString()}
                    </p>
                    <div className="flex items-center space-x-1">
                      {transaction.status === 'completed' ? (
                        <CheckCircle className="text-green-500" size={16} />
                      ) : (
                        <Clock className="text-yellow-500" size={16} />
                      )}
                      <span className={`text-xs ${transaction.status === 'completed' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 border-t border-gray-100">
            <button className="w-full text-violet-600 hover:text-violet-700 font-medium transition-colors">
              View All Transactions
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FeaturesPage = () => (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Modern Payments
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover all the ways PayFlow makes digital payments simple, secure, and efficient
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Instant UPI Transfers
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Send money instantly to anyone using their UPI ID. Our platform supports all major UPI providers and ensures your transactions are processed in real-time.
            </p>
            <div className="space-y-4">
              {[
                "Real-time transaction processing",
                "Support for all UPI providers",
                "24/7 availability",
                "Zero transaction fees for UPI"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="text-green-500" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl p-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Send to UPI ID</h3>
                <Zap className="text-violet-600" size={20} />
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  className="w-full p-3 border border-gray-200 rounded-xl"
                  value="john@paytm"
                  readOnly
                />
                <input
                  type="text"
                  placeholder="Amount"
                  className="w-full p-3 border border-gray-200 rounded-xl"
                  value="₹2,500"
                  readOnly
                />
                <button className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-semibold">
                  Send Instantly
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="lg:order-2">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Advanced Security
            </h2>
            <p className="text-gray-600 mb-8 text-lg leading-relaxed">
              Your security is our top priority. We use bank-grade encryption and multi-layer authentication to keep your money and data safe.
            </p>
            <div className="space-y-4">
              {[
                "End-to-end encryption",
                "Biometric authentication",
                "Real-time fraud detection",
                "PCI DSS compliant"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Shield className="text-blue-500" size={20} />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:order-1 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-3xl p-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-gray-800">Security Center</h3>
                <Shield className="text-blue-600" size={20} />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm text-gray-700">Two-Factor Authentication</span>
                  <CheckCircle className="text-green-500" size={16} />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm text-gray-700">Biometric Lock</span>
                  <CheckCircle className="text-green-500" size={16} />
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <span className="text-sm text-gray-700">Device Registration</span>
                  <CheckCircle className="text-green-500" size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-violet-100 mb-8">
            Join millions of users who trust PayFlow for their digital payments
          </p>
          <button
            onClick={() => setCurrentPage('signup')}
            className="bg-white text-violet-600 px-8 py-4 rounded-2xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Create Your Account
          </button>
        </div>
      </div>
    </div>
  );

  const AboutPage = () => (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About PayFlow
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're on a mission to make digital payments accessible, secure, and effortless for everyone
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-6 text-lg leading-relaxed">
              Founded in 2020, PayFlow emerged from a simple idea: digital payments should be as easy as sending a text message. Our team of fintech experts and security specialists came together to build a platform that combines cutting-edge technology with user-friendly design.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              Today, we serve over 10 million users across India, processing billions of rupees in transactions while maintaining the highest standards of security and reliability.
            </p>
          </div>
          <div className="bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl p-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-violet-600 mb-2">10M+</div>
                <div className="text-gray-600">Users</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">₹500Cr+</div>
                <div className="text-gray-600">Processed</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div className="bg-white rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                <div className="text-gray-600">Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Security First</h3>
            <p className="text-gray-600">
              We employ bank-grade security measures to protect your transactions and personal data.
            </p>
          </div>
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">User-Centric</h3>
            <p className="text-gray-600">
              Every feature is designed with our users in mind, ensuring the best possible experience.
            </p>
          </div>
          <div className="text-center p-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Zap className="text-white" size={32} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Innovation</h3>
            <p className="text-gray-600">
              We continuously innovate to bring you the latest in payment technology and features.
            </p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-3xl p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Team</h2>
            <p className="text-gray-600">
              Meet the passionate individuals behind PayFlow
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Rajesh Kumar', role: 'CEO & Co-founder', image: 'RK' },
              { name: 'Priya Sharma', role: 'CTO & Co-founder', image: 'PS' },
              { name: 'Amit Patel', role: 'Head of Security', image: 'AP' }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                  {member.image}
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const ContactPage = () => (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Have questions or need support? We're here to help you 24/7
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                  <Smartphone className="text-violet-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone Support</h3>
                  <p className="text-gray-600">+91 1800-123-4567</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Send className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
                  <p className="text-gray-600">support@payflow.com</p>
                  <p className="text-sm text-gray-500">Response within 2 hours</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
                  <p className="text-gray-600">Available on our app</p>
                  <p className="text-sm text-gray-500">Instant support</p>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl text-white">
              <h3 className="text-lg font-semibold mb-2">Need immediate help?</h3>
              <p className="text-violet-100 mb-4">
                For urgent issues related to transactions or account security, please call our emergency helpline.
              </p>
              <button className="bg-white text-violet-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200">
                Emergency Support
              </button>
            </div>
          </div>

          <div className="bg-gray-50 rounded-3xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200">
                  <option>Select a topic</option>
                  <option>Account Issues</option>
                  <option>Transaction Problems</option>
                  <option>Technical Support</option>
                  <option>Feature Request</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-violet-500 focus:ring-2 focus:ring-violet-200 transition-all duration-200"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'features':
        return <FeaturesPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage />;
      case 'signup':
        return <SignupPage />;
      case 'dashboard':
        return <DashboardPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      {renderPage()}

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 h-full w-64 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="text-xl font-bold text-violet-600">PayFlow</div>
                <button onClick={() => setMobileMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="space-y-4">
                {['home', 'features', 'about', 'contact'].map((page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left py-2 px-4 rounded-xl transition-colors ${currentPage === page
                      ? 'bg-violet-100 text-violet-600'
                      : 'text-gray-600 hover:bg-gray-100'
                      }`}
                  >
                    {page.charAt(0).toUpperCase() + page.slice(1)}
                  </button>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  {user ? (
                    <button
                      onClick={() => {
                        setCurrentPage('dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-center"
                    >
                      Dashboard
                    </button>
                  ) : (
                    <div className="space-y-2">
                      <button
                        onClick={() => {
                          setCurrentPage('login');
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full text-gray-600 py-2 px-4 text-center"
                      >
                        Login
                      </button>
                      <button
                        onClick={() => {
                          setCurrentPage('signup');
                          setMobileMenuOpen(false);
                        }}
                        className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-center"
                      >
                        Sign Up
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PayFlowApp;