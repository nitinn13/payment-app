import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, Clock, AlertCircle, Copy, Download, Share2, Receipt, ArrowUpRight, ArrowDownLeft, Calendar, User, CreditCard, Shield, ExternalLink } from 'lucide-react';

const TransactionDetailsPage = () => {
    // Mock transaction ID for demonstration
    const { id } = useParams();
    const [transaction, setTransaction] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const navigate =useNavigate();

    useEffect(() => {
        const fetchTransactionDetails = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(`http://localhost:3000/transaction/my-transactions/${id}`,
                    {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    }
                );
                const data = await response.json();
                setTransaction(data.transaction);
            } catch (error) {
                setError('Failed to fetch transaction details.');
                console.error('Error fetching transaction details:', error);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchTransactionDetails();
        }
    }, [id]);

    const handleCopyTransactionId = async () => {
        try {
            await navigator.clipboard.writeText(transaction.id);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy transaction ID');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    const formatDateTime = (dateString) => {
        const date = new Date(dateString);
        return {
            date: formatDate(dateString),
            time: formatTime(dateString),
            full: date.toLocaleString('en-IN')
        };
    };

    const getStatusConfig = (status) => {
        const configs = {
            completed: {
                icon: CheckCircle,
                color: 'text-green-600',
                bgColor: 'bg-green-100',
                text: 'Completed'
            },
            pending: {
                icon: Clock,
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-100',
                text: 'Pending'
            },
            failed: {
                icon: AlertCircle,
                color: 'text-red-600',
                bgColor: 'bg-red-100',
                text: 'Failed'
            }
        };
        return configs[status] || configs.pending;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 px-8 py-12">
                    <div className="max-w-4xl mx-auto">
                        <div className="animate-pulse flex items-center space-x-4">
                            <div className="w-8 h-8 bg-purple-400 rounded-lg"></div>
                            <div className="h-8 bg-purple-400 rounded w-1/3"></div>
                        </div>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-8 -mt-8">
                    <div className="bg-white rounded-2xl shadow-lg p-8 animate-pulse">
                        <div className="space-y-6">
                            <div className="h-6 bg-gray-300 rounded w-1/4"></div>
                            <div className="h-12 bg-gray-300 rounded w-1/2"></div>
                            <div className="space-y-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-4 bg-gray-300 rounded w-full"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Error Loading Transaction</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => window.history.back()}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (!transaction) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full mx-4">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Receipt className="w-8 h-8 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900 mb-2">Transaction Not Found</h2>
                        <p className="text-gray-600 mb-6">The requested transaction could not be located.</p>
                        <button
                            onClick={() => {
                              navigate(`/dashboard/`);
                            }}
                            className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    const createdDateTime = formatDateTime(transaction.createdAt);
    const updatedDateTime = formatDateTime(transaction.updatedAt);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 px-8 py-12">
                <div className="max-w-4xl mx-auto">
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
                            <h1 className="text-3xl font-bold text-white">Transaction Details</h1>
                            <p className="text-purple-100 mt-1">Complete information about your transaction</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-8 -mt-8 pb-12">
                {/* Main Transaction Card */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
                    {/* Transaction Header */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-8 border-b">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center space-x-6 mb-6 md:mb-0">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${
                                    transaction.type === 'CREDIT' 
                                        ? 'bg-gradient-to-br from-green-400 to-green-600' 
                                        : 'bg-gradient-to-br from-purple-400 to-purple-600'
                                } text-white`}>
                                    {transaction.type === 'CREDIT' ? (
                                        <ArrowDownLeft className="w-8 h-8" />
                                    ) : (
                                        <ArrowUpRight className="w-8 h-8" />
                                    )}
                                </div>
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h2 className="text-2xl font-bold text-gray-900">
                                            {transaction.type === 'CREDIT' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                        </h2>
                                        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full  bg-green-700 `}>
                                            {/* <StatusIcon className={`w-4 h-4 `} /> */}
                                            <span className={`text-sm font-semibold text-white`}>
                                                Successful
                                            </span>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 font-medium">{transaction.description}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={handleCopyTransactionId}
                                    className="flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    <Copy className="w-4 h-4" />
                                    <span className="text-sm font-medium">
                                        {copied ? 'Copied!' : 'Copy ID'}
                                    </span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
                                    <Download className="w-4 h-4" />
                                    <span className="text-sm font-medium">Download</span>
                                </button>
                                <button className="flex items-center justify-center space-x-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                                    <Share2 className="w-4 h-4" />
                                    <span className="text-sm font-medium">Share</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Transaction Details Grid */}
                    <div className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Transaction Information */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">
                                    Transaction Information
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-medium text-gray-500">Transaction ID</span>
                                        <div className="text-right">
                                            <span className="text-sm font-mono text-gray-900 m-1">{transaction.id}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-medium text-gray-500">Type</span>
                                        <span className={`text-sm font-semibold px-2 py-1 rounded ${
                                            transaction.type === 'CREDIT' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-purple-100 text-purple-800'
                                        }`}>
                                            {transaction.type}
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-medium text-gray-500">Payment Method</span>
                                        <span className="text-sm text-gray-900 font-medium">{transaction.paymentMethod}</span>
                                    </div>

                                    {transaction.bankReference && (
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-medium text-gray-500">Bank Reference</span>
                                            <span className="text-sm font-mono text-gray-900">{transaction.bankReference}</span>
                                        </div>
                                    )}

                                    {transaction.razorpayId && (
                                        <div className="flex justify-between items-start">
                                            <span className="text-sm font-medium text-gray-500">Razorpay ID</span>
                                            <div className="text-right">
                                                <span className="text-sm font-mono text-gray-900">{transaction.razorpayId}</span>
                                                <button className="ml-2 text-purple-600 hover:text-purple-700">
                                                    <ExternalLink className="w-3 h-3" />
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="space-y-6">
                                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-3">
                                    Payment Details
                                </h3>
                                
                                <div className="space-y-4">
                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-medium text-gray-500">From</span>
                                        <div className="text-right">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{transaction.senderUpiId}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-start">
                                        <span className="text-sm font-medium text-gray-500">To</span>
                                        <div className="text-right">
                                            <div className="flex items-center space-x-2">
                                                <User className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm text-gray-900">{transaction.receiverUpiId}</span>
                                                {transaction.merchantInfo?.verified && (
                                                    <Shield className="w-4 h-4 text-green-500" />
                                                )}
                                            </div>
                                            {transaction.merchantInfo?.name && (
                                                <div className="text-xs text-gray-500 mt-1">
                                                    {transaction.merchantInfo.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div className="flex justify-between">
                                            <span className="text-sm text-gray-600">Amount</span>
                                            <span className="text-sm font-medium">₹{transaction.amount.toFixed(2)}</span>
                                        </div>
                                        {transaction.fee > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Transaction Fee</span>
                                                <span className="text-sm">₹{transaction.fee.toFixed(2)}</span>
                                            </div>
                                        )}
                                        {transaction.tax > 0 && (
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Tax</span>
                                                <span className="text-sm">₹{transaction.tax.toFixed(2)}</span>
                                            </div>
                                        )}
                                        <div className="border-t pt-3 flex justify-between">
                                            <span className="text-sm font-semibold text-gray-900">Net Amount</span>
                                            {/* <span className="text-sm font-bold text-gray-900">₹{transaction.netAmount.toFixed(2)}</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="mt-8 pt-8 border-t border-gray-200">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                                        <Calendar className="w-4 h-4 text-purple-600" />
                                    </div>
                                    <div>
                                        <div className="font-medium text-gray-900">Transaction Completed</div>
                                        <div className="text-sm text-gray-500">
                                            {createdDateTime.date} at {createdDateTime.time}
                                        </div>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => {
                          navigate(`/transactions/`);
                        }}
                        className="bg-white border border-gray-200 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                    >
                        Back to Transactions
                    </button>
                    <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
                        Download Receipt
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TransactionDetailsPage;