import React, { useState, useEffect, useCallback } from 'react';
import { Bell, Settings, User, LogOut, ChevronDown, Search, Menu, X, Home, CreditCard, Users, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  currentPage?: string;
  notificationCount?: number;
  showSearch?: boolean;
  showMobileMenu?: boolean;
  onMobileMenuToggle?: () => void;
}

interface Notification {
  id: number;
  title: string;
  message: string;
  time: string;
  type: 'success' | 'sent' | 'info';
}

interface NavItem {
  name: string;
  icon: React.ComponentType<{ size: number }>;
  href: string;
}

interface UserData {
  name?: string;
  email?: string;
  [key: string]: any;
}

const Header: React.FC<HeaderProps> = ({
  currentPage = "Dashboard",
  notificationCount = 3,
  showSearch = true,
  showMobileMenu = false,
  onMobileMenuToggle = () => {}
}) => {
  const navigate = useNavigate();
  const [data, setData] = useState<UserData>({});
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifications: Notification[] = [
    { id: 1, title: "Payment received", message: "₹567.00 from 0e4aea90-dc12", time: "2 min ago", type: "success" },
    { id: 2, title: "Payment sent", message: "₹100.00 to soham@upi", time: "5 min ago", type: "sent" },
    { id: 3, title: "New feature available", message: "Try our new investment tools", time: "1 hour ago", type: "info" }
  ];

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: Home, href: '/dashboard' },
    { name: 'Transactions', icon: CreditCard, href: '/transactions' },
    { name: 'Contacts', icon: Users, href: '/contacts' },
  ];

  const onLogout = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/login');
  }, [navigate]);

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch('https://payment-app-backend-dulq.onrender.com/user/me',
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token') || ''}`
            }
          }
        );
        if (!response.ok) {
          console.error('Failed to fetch user data:', response.status);
          if (response.status === 401) {
            onLogout();
          }
          return;
        }
        const responseData = await response.json();
        setData(responseData.user || {});
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    getData();
  }, [onLogout]);

  const userName = data?.name;
  const userEmail = data?.email;
    return (
        <>
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Left Section - Logo & Navigation */}
                        <div className="flex items-center gap-8">
                            {/* Logo */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                                    <span className="text-white font-bold text-lg">P</span>
                                </div>
                                <div className="hidden sm:block">
                                    <h1 className="text-xl font-bold text-gray-900">PayFlow</h1>
                                    <p className="text-xs text-gray-500 -mt-1">Financial Dashboard</p>
                                </div>
                            </div>

                            {/* Desktop Navigation */}
                            <nav className="hidden lg:flex items-center space-x-1">
                                {navItems.map((item) => {
                                    const Icon = item.icon;
                                    const isActive = item.name === currentPage;
                                    return (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                                                isActive
                                                    ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                            }`}
                                        >
                                            <Icon size={16} />
                                            {item.name}
                                        </a>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Center Section - Search (Optional) */}
                        {showSearch && (
                            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                                <div className="relative w-full">
                                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search transactions, contacts..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Right Section - Actions */}
                        <div className="flex items-center gap-3">
                            {/* Search Button (Mobile) */}
                            {showSearch && (
                                <button className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                    <Search size={20} />
                                </button>
                            )}

                            {/* Notifications */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                                    className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <Bell size={20} />
                                    {notificationCount > 0 && (
                                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
                                            {notificationCount > 9 ? '9+' : notificationCount}
                                        </span>
                                    )}
                                </button>

                                {/* Notifications Dropdown */}
                                {isNotificationOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsNotificationOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-20">
                                            <div className="p-4 border-b border-gray-100">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-gray-900">Notifications</h3>
                                                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                                                        {notificationCount} new
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="max-h-80 overflow-y-auto">
                                                {notifications.map((notification) => (
                                                    <div key={notification.id} className="p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer">
                                                        <div className="flex items-start gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                                                                notification.type === 'success' ? 'bg-green-100 text-green-700' :
                                                                notification.type === 'sent' ? 'bg-red-100 text-red-700' :
                                                                'bg-blue-100 text-blue-700'
                                                            }`}>
                                                                {notification.type === 'info' ? 'ℹ' : '₹'}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                                                                <p className="text-gray-600 text-sm truncate">{notification.message}</p>
                                                                <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 border-t border-gray-100">
                                                <button className="w-full text-center text-purple-600 hover:text-purple-700 text-sm font-medium py-1">
                                                    View all notifications
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Settings */}
                            <button className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                                <Settings size={20} />
                            </button>

                            {/* Profile Dropdown */}
                            <div className="relative">
                                <button
                                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                                    className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors"
                                >
                                    <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-purple-700 rounded-lg flex items-center justify-center text-white text-sm font-medium">
                                        {getInitials(userName)}
                                    </div>
                                    <ChevronDown size={16} className="text-gray-600 hidden sm:block" />
                                </button>

                                {/* Profile Dropdown Menu */}
                                {isProfileOpen && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-gray-200 z-20">
                                            <div className="p-4 border-b border-gray-100">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center text-white font-medium">
                                                        {getInitials(userName)}
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="font-semibold text-gray-900 truncate">{userName}</p>
                                                        <p className="text-sm text-gray-600 truncate">{userEmail}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-2">
                                                <button onClick={() => navigate('/me')} className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <User size={18} />
                                                    <span>Profile Settings</span>
                                                </button>

                                                <button className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                                                    <HelpCircle size={18} />
                                                    <span>Help & Support</span>
                                                </button>
                                            </div>
                                            <div className="p-2 border-t border-gray-100">
                                                <button
                                                    onClick={() => {
                                                        setIsProfileOpen(false);
                                                        onLogout();
                                                    }}
                                                    className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full text-left"
                                                >
                                                    <LogOut size={18} />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button
                                onClick={onMobileMenuToggle}
                                className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                            >
                                {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {showMobileMenu && (
                    <div className="lg:hidden border-t border-gray-200 bg-white">
                        <div className="px-4 py-3 space-y-1">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.name === currentPage;
                                return (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all ${
                                            isActive
                                                ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icon size={18} />
                                        {item.name}
                                    </a>
                                );
                            })}
                        </div>

                        {/* Mobile Search */}
                        {showSearch && (
                            <div className="px-4 pb-4">
                                <div className="relative">
                                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        placeholder="Search..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;