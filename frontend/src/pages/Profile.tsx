import React, { useState, useEffect } from 'react';
import { User, Mail, AtSign, Calendar, Edit3, Camera, Settings } from 'lucide-react';

const Profile = () => {
    const [data, setData] = useState({});
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        
        
        const getData = async () => {
            const response = await fetch('https://payment-app-backend-dulq.onrender.com/user/me',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }
            )
            const responseData = await response.json()
            console.log(responseData)
            setData(responseData.user)
        }
        getData()
        
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    const getInitials = (name) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8">
            {/* Header */}
            <div className="max-w-4xl mx-auto mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
                        <p className="text-gray-600 mt-1">Manage your account information</p>
                    </div>
                    <button 
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-2 bg-white border border-gray-200 hover:border-purple-300 px-4 py-2 rounded-lg transition-colors"
                    >
                        <Edit3 size={16} />
                        {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="text-center">
                            {/* Profile Picture */}
                            <div className="relative inline-block mb-4">
                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                                    {getInitials(data.name)}
                                </div>
                                <button className="absolute -bottom-1 -right-1 bg-white rounded-full p-2 shadow-lg border border-gray-200 hover:border-purple-300 transition-colors">
                                    <Camera size={14} className="text-gray-600" />
                                </button>
                            </div>
                            
                            <h2 className="text-xl font-bold text-gray-900 mb-1">
                                {data.name || 'Loading...'}
                            </h2>
                            <p className="text-purple-600 font-medium mb-4">
                                @{data.username || 'username'}
                            </p>
                            
                            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-3 mb-4">
                                <p className="text-sm text-gray-600 mb-1">Member since</p>
                                <p className="font-semibold text-gray-900">
                                    {formatDate(data.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mt-6">
                        <h3 className="font-semibold text-gray-900 mb-4">Account Stats</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Total Transactions</span>
                                <span className="font-semibold text-gray-900">156</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">This Month</span>
                                <span className="font-semibold text-green-600">+12%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-600">Account Status</span>
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Personal Information */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                            <Settings size={20} className="text-gray-400" />
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <User size={16} />
                                    Full Name
                                </label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        defaultValue={data.name}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    />
                                ) : (
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        {data.name || 'Not provided'}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <AtSign size={16} />
                                    Username
                                </label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        defaultValue={data.username}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    />
                                ) : (
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        {data.username || 'Not provided'}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Mail size={16} />
                                    Email Address
                                </label>
                                {isEditing ? (
                                    <input 
                                        type="email" 
                                        defaultValue={data.email}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    />
                                ) : (
                                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                                        {data.email || 'Not provided'}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                                    <Calendar size={16} />
                                    UPI ID
                                </label>
                                {isEditing ? (
                                    <input 
                                        type="text" 
                                        defaultValue={data.upiId}
                                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                                    />
                                ) : (
                                    <div className="p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-100">
                                        <span className="font-mono text-purple-700">
                                            {data.upiId || 'Not provided'}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {isEditing && (
                            <div className="flex gap-3 mt-6 pt-6 border-t border-gray-100">
                                <button className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all font-medium">
                                    Save Changes
                                </button>
                                <button 
                                    onClick={() => setIsEditing(false)}
                                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Security Settings */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-6">Security & Privacy</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                                </div>
                                <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                                    Enable
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <h4 className="font-medium text-gray-900">Change Password</h4>
                                    <p className="text-sm text-gray-600">Update your account password</p>
                                </div>
                                <button className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                                    Change
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                                <div>
                                    <h4 className="font-medium text-gray-900">Login Activity</h4>
                                    <p className="text-sm text-gray-600">View recent login sessions</p>
                                </div>
                                <button className="border border-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors text-sm font-medium">
                                    View
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;