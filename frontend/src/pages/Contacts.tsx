import { useState, useEffect } from 'react';
import { ArrowLeft, Search, Shield, UserPlus, Send, AlertCircle, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Contact {
  id?: string;
  name: string;
  upiId?: string;
  verified?: boolean;
  [key: string]: any; // For any additional properties
}

const Contacts = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    const navigate = useNavigate();

    useEffect(() => {
        const fetchContacts = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch('https://payment-app-backend-dulq.onrender.com/user/all-users', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Failed to fetch contacts');
                }
                
                const result = await response.json();
                
                // Handle different possible response structures
                const contactsData: Contact[] = result.contacts || result.users || result.data || [];
                setContacts(contactsData);
                setLoading(false);
                
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setError('Failed to fetch contacts. Please try again.');
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.upiId && contact.upiId.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const getInitials = (name: string): string => {
        return name.charAt(0).toUpperCase();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Animated Header Skeleton */}
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
                    <div className="px-6 py-16 relative">
                        <div className="max-w-6xl mx-auto">
                            <div className="flex items-center space-x-4 mb-6 animate-pulse">
                                <div className="w-10 h-10 bg-purple-400/50 rounded-xl"></div>
                                <div className="space-y-2">
                                    <div className="h-8 bg-purple-400/50 rounded-lg w-48"></div>
                                    <div className="h-4 bg-purple-400/30 rounded w-32"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Skeleton */}
                <div className="max-w-6xl mx-auto px-6 -mt-12 pb-12">
                    <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                        <div className="p-6 border-b border-gray-100 animate-pulse">
                            <div className="h-12 bg-gray-200 rounded-xl"></div>
                        </div>
                        <div className="p-6 space-y-4">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="flex items-center space-x-4 p-4 animate-pulse">
                                    <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                        <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertCircle className="w-10 h-10 text-red-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">Oops! Something went wrong</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!contacts || contacts.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
                <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full">
                    <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Users className="w-10 h-10 text-purple-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-3">No Contacts Yet</h2>
                        <p className="text-gray-600 mb-8 leading-relaxed">Start building your network by adding your first contact.</p>
                        <button
                            onClick={() => navigate('/add-contact')}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white px-8 py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            Add Your First Contact
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Enhanced Header with Glassmorphism */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
                <div className="absolute inset-0 opacity-30" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
                <div className="px-6 py-16 relative">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex items-center space-x-4 mb-6">
                            <button
                                onClick={() => navigate(-1)}
                                className="bg-white/20 backdrop-blur-sm text-white p-3 rounded-xl hover:bg-white/30 transition-all duration-200 border border-white/20"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">My Contacts</h1>
                                <p className="text-purple-100 text-lg">Manage your payment contacts</p>
                            </div>
                        </div>
                        
                        {/* Stats Bar */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                        <Users className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold">{contacts.length} Total Contacts</p>
                                        <p className="text-purple-200 text-sm">Ready for transactions</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-white font-semibold">{filteredContacts.length} Shown</p>
                                    <p className="text-purple-200 text-sm">After filtering</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 -mt-12 pb-12">
                {/* Enhanced Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
                    {/* Enhanced Search Bar */}
                    <div className="bg-gradient-to-r from-gray-50 via-white to-gray-50 p-6 border-b border-gray-100">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-purple-600 transition-colors" />
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-lg placeholder-gray-400"
                                placeholder="Search by name or UPI ID..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Enhanced Contacts List */}
                    <div className="divide-y divide-gray-100">
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact, index) => (
                                <div key={contact.id || index} className="group hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 transition-all duration-200">
                                    <div className="p-6 flex items-center space-x-4">
                                        <div className="flex-shrink-0">
                                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg group-hover:shadow-xl transition-all duration-200">
                                                {getInitials(contact.name)}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center space-x-3 mb-1">
                                                <h3 className="text-xl font-semibold text-gray-900 truncate group-hover:text-purple-700 transition-colors">
                                                    {contact.name}
                                                </h3>
                                                {contact.verified && (
                                                    <div className="flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                                                        <Shield className="w-3 h-3 text-green-600" />
                                                        <span className="text-xs font-medium text-green-700">Verified</span>
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-500 truncate font-mono text-sm bg-gray-100 px-2 py-1 rounded-md inline-block">
                                                {contact.upiId || 'No UPI ID'}
                                            </p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button 
                                                onClick={() => navigate(`/send-money?upi=${contact.upiId}`)}
                                                className="bg-purple-600 text-white p-3 rounded-full hover:bg-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110 group-hover:bg-purple-700"
                                                title="Send Money"
                                            >
                                                <Send className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Search className="w-8 h-8 text-gray-400" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your search query or add a new contact</p>
                                <button
                                    onClick={() => navigate('/add-contact')}
                                    className="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition-colors"
                                >
                                    Add New Contact
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Enhanced Floating Action Button */}
            <button
                onClick={() => navigate('/add-contact')}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-full shadow-2xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-110 border-4 border-white animate-bounce"
                title="Add New Contact"
            >
                <UserPlus className="w-6 h-6" />
            </button>
        </div>
    );
};

export default Contacts;