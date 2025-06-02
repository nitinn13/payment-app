import { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownLeft, ArrowLeft, Search, Filter, Download, MoreHorizontal, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

interface Transaction {
    id: string;
    amount: number;
    transactionType: 'sent' | 'received';
    createdAt: string;
    receiverUpiId?: string;
    senderUpiId?: string;
    [key: string]: any;
}

const Transactions = () => {
    const [data, setData] = useState<Transaction[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState<'all' | 'sent' | 'received'>('all');
    const [dateRange, setDateRange] = useState<string>('all');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true);
                const response = await fetch('https://payment-app-backend-dulq.onrender.com/transaction/my-transactions', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token') || ''}`
                    }
                });
                const result = await response.json();
                setData(result.transactions || []);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const formatAmount = (amount: number, type: string): string => {
        const formatted = `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
        return type === 'received' ? `+${formatted}` : `-${formatted}`;
    };

    const getTransactionIcon = (type: string) => {
        return type === 'received' ?
            <ArrowDownLeft className="w-4 h-4 text-green-600" /> :
            <ArrowUpRight className="w-4 h-4 text-red-600" />;
    };

    const getTransactionDescription = (transaction: Transaction): string => {
        if (transaction.transactionType === 'received') {
            return `Received from ${transaction.senderUpiId || 'unknown'}`;
        } else {
            return `Sent to ${transaction.receiverUpiId || 'unknown'}`;
        }
    };

    const filteredTransactions = data.filter(transaction => {
        const matchesSearch =
            (transaction.receiverUpiId && transaction.receiverUpiId.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (transaction.senderUpiId && transaction.senderUpiId.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (transaction.id && transaction.id.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesFilter = filterType === 'all' ||
            (filterType === 'sent' && transaction.transactionType === 'sent') ||
            (filterType === 'received' && transaction.transactionType === 'received');

        return matchesSearch && matchesFilter;
    });

    const totalReceived = data
        .filter(t => t.transactionType === 'received')
        .reduce((sum, t) => sum + t.amount, 0);

    const totalSent = data
        .filter(t => t.transactionType === 'sent')
        .reduce((sum, t) => sum + t.amount, 0);

    const netBalance = totalReceived - totalSent;

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 px-8 py-12">
                    <div className="max-w-7xl mx-auto">
                        <div className="animate-pulse">
                            <div className="h-8 bg-purple-400 rounded w-1/4 mb-4"></div>
                            <div className="h-4 bg-purple-400 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-8 -mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl p-6 shadow-sm animate-pulse">
                                <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
                                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header/>
            {/* Header Section */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 px-8 py-12">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="text-white mb-6 md:mb-0">
                            <div className="flex items-center space-x-4 mb-6">
                                <button
                                    onClick={() => {
                                        navigate(`/dashboard/`);
                                    }}
                                    className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
                                >
                                    <ArrowLeft className="w-6 h-6" />
                                </button>
                                <div>
                                    <h1 className="text-3xl font-bold text-white">Transaction History</h1>
                                    <p className="text-purple-100 mt-1">Complete overview of your financial activities</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg font-medium hover:bg-white/20 transition-all duration-200 flex items-center justify-center">
                                <Download className="w-5 h-5 mr-2" />
                                Export Data
                            </button>
                            <button className="bg-white text-purple-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center justify-center shadow-lg">
                                <Eye className="w-5 h-5 mr-2" />
                                View Statement
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-8 -mt-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 ">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Received</div>
                            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                <ArrowDownLeft className="w-5 h-5 text-green-600" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            ₹{totalReceived.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-green-600 font-medium mt-1">
                            {data.filter(t => t.transactionType === 'received').length} transactions
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Sent</div>
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                                <ArrowUpRight className="w-5 h-5 text-red-600" />
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">
                            ₹{totalSent.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-red-600 font-medium mt-1">
                            {data.filter(t => t.transactionType === 'sent').length} transactions
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Net Balance</div>
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${netBalance >= 0 ? 'bg-blue-100' : 'bg-orange-100'}`}>
                                <div className={`w-3 h-3 rounded-full ${netBalance >= 0 ? 'bg-blue-600' : 'bg-orange-600'}`}></div>
                            </div>
                        </div>
                        <div className={`text-2xl font-bold ${netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                            {netBalance >= 0 ? '+' : ''}₹{Math.abs(netBalance).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-sm text-gray-500 font-medium mt-1">
                            Current period
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Total Transactions</div>
                            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                                <div className="w-4 h-4 bg-purple-600 rounded"></div>
                            </div>
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{data.length}</div>
                        <div className="text-sm text-purple-600 font-medium mt-1">
                            This month
                        </div>
                    </div>
                </div>

                {/* Filters and Controls */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                        <div className="flex flex-col sm:flex-row gap-4 flex-1">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    type="text"
                                    placeholder="Search by UPI ID or transaction ID..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
                                />
                            </div>
                            <div className="flex gap-3">
                                <select
                                    value={filterType}
                                    onChange={(e) => setFilterType(e.target.value as 'all' | 'sent' | 'received')}
                                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-sm font-medium"
                                >
                                    <option value="all">All Types</option>
                                    <option value="received">Received</option>
                                    <option value="sent">Sent</option>
                                </select>
                                <select
                                    value={dateRange}
                                    onChange={(e) => setDateRange(e.target.value)}
                                    className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-sm font-medium"
                                >
                                    <option value="all">All Time</option>
                                    <option value="today">Today</option>
                                    <option value="week">This Week</option>
                                    <option value="month">This Month</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 font-medium">
                                {filteredTransactions.length} of {data.length} transactions
                            </span>
                            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                                <Filter className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-lg font-semibold text-gray-900">Recent Transactions</h2>
                    </div>

                    {filteredTransactions.length === 0 ? (
                        <div className="p-12 text-center">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
                            <p className="text-gray-500">Try adjusting your search criteria or filters</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Transaction</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Type</th>
                                        <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Date & Time</th>
                                        <th className="text-right py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Amount</th>
                                        <th className="text-center py-4 px-6 text-sm font-semibold text-gray-600 uppercase tracking-wide">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 ">
                                    {filteredTransactions.map((transaction) => (
                                        <tr key={transaction.id}
                                            onClick={() => {
                                                navigate(`/transactions/my-transactions/${transaction.id}`);
                                            }}
                                            className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer">
                                            <td className="py-4 px-6">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${transaction.transactionType === 'received' ? 'bg-green-100' : 'bg-red-100'}`}>
                                                        {getTransactionIcon(transaction.transactionType)}
                                                    </div>
                                                    <div>
                                                        <div className="font-semibold text-gray-900 mb-1">
                                                            {getTransactionDescription(transaction)}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            ID: {transaction.id}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${transaction.transactionType === 'received'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                                    }`}>
                                                    {transaction.transactionType === 'received' ? (
                                                        <ArrowDownLeft className="w-3 h-3 mr-1" />
                                                    ) : (
                                                        <ArrowUpRight className="w-3 h-3 mr-1" />
                                                    )}
                                                    {transaction.transactionType.charAt(0).toUpperCase() + transaction.transactionType.slice(1)}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="text-sm">
                                                    <div className="font-medium text-gray-900">
                                                        {formatDate(transaction.createdAt)}
                                                    </div>
                                                    <div className="text-gray-500">
                                                        {formatTime(transaction.createdAt)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <div className={`text-lg font-bold ${transaction.transactionType === 'received'
                                                    ? 'text-green-600'
                                                    : 'text-red-600'
                                                    }`}>
                                                    {formatAmount(transaction.amount, transaction.transactionType)}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                {/* Pagination or Load More */}
                <div className="flex justify-center mt-8 mb-12">
                    <button className="bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 shadow-sm">
                        Load More Transactions
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Transactions;