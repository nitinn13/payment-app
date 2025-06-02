import { useState } from 'react';
import {
  ArrowRight,
  Shield,
  Zap,
  Users,
  CreditCard,
  Smartphone,
  TrendingUp,
  Menu,
  X
} from 'lucide-react';

const PayFlowApp = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            <button className="text-sm font-medium text-violet-600">
              Home
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors duration-200">
              Features
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors duration-200">
              About
            </button>
            <button className="text-sm font-medium text-gray-600 hover:text-violet-600 transition-colors duration-200">
              Contact
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="flex space-x-2">
              <a
                href="/login"
                className="text-gray-600 hover:text-violet-600 px-4 py-2 text-sm font-medium transition-colors"
              >
                Login
              </a>
              <a
                href="/signup"
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Sign Up
              </a>
            </div>

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

  return (
    <div className="min-h-screen">
      <Header />

      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-72 h-72 bg-violet-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
            <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
                  <a
                    href="/signup"
                    className="group bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-violet-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
                  >
                    Get Started
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                  </a>
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
                          N
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
                <button className="block w-full text-left py-2 px-4 rounded-xl bg-violet-100 text-violet-600">
                  Home
                </button>
                <button className="block w-full text-left py-2 px-4 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                  Features
                </button>
                <button className="block w-full text-left py-2 px-4 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                  About
                </button>
                <button className="block w-full text-left py-2 px-4 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors">
                  Contact
                </button>
                <div className="pt-4 border-t border-gray-200">
                  <div className="space-y-2">
                    <a
                      href="/login"
                      className="block w-full text-gray-600 py-2 px-4 text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Login
                    </a>
                    <a
                      href="/signup"
                      className="block w-full bg-gradient-to-r from-violet-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign Up
                    </a>
                  </div>
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