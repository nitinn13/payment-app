import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            
            
            const response = await axios.post('http://localhost:3000/user/signup', {
                name,
                username,
                email,
                password
            });
            localStorage.setItem('token', response.data.token);
            navigate('/dashboard');
            
        } catch (error) {
            console.error('Signup failed:', error);
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-purple-200 rounded-full opacity-60 blur-xl"></div>
            <div className="absolute bottom-32 right-32 w-40 h-40 bg-purple-300 rounded-full opacity-40 blur-2xl"></div>
            <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-100 rounded-full opacity-50 blur-lg"></div>
            
            {/* Header */}
            <nav className="flex justify-between items-center px-8 py-6">
                <button onClick={() => navigate('/')}
                className="text-2xl font-bold text-purple-600">PayFlow</button>
                
            </nav>

            {/* Main Content */}
            <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
                <div className="w-full max-w-md">
                    {/* Signup Card */}
                    <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 relative">
                        {/* Card glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-3xl blur-xl"></div>
                        
                        <div className="relative z-10">
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h1>
                                <p className="text-gray-600">Join PayFlow and start sending money instantly</p>
                            </div>

                            <div className="space-y-6">
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 block">Full Name</label>
                                    <div className="relative">
                                        <input 
                                            onChange={e => setName(e.target.value)}
                                            type="text" 
                                            placeholder="Enter your full name" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                {/* Username Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 block">Username</label>
                                    <div className="relative">
                                        <input
                                            onChange={e => setUsername(e.target.value)}
                                            type="text" 
                                            placeholder="Choose a username" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                                    <div className="relative">
                                        <input 
                                            onChange={e => setEmail(e.target.value)}
                                            type="email" 
                                            placeholder="Enter your email" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700 block">Password</label>
                                    <div className="relative">
                                        <input
                                            onChange={e => setPassword(e.target.value)}
                                            type="password" 
                                            placeholder="Create a strong password" 
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
                                        />
                                    </div>
                                </div>

                                {/* Signup Button */}
                                <button 
                                    onClick={handleSignup}
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Creating Account...</span>
                                        </>
                                    ) : (
                                        <span>Create Account</span>
                                    )}
                                </button>

                                {/* Additional Options */}
                                <div className="text-center">
                                    <p className="text-sm text-gray-600">
                                        Already have an account? 
                                        <button 
                                        onClick={() => navigate('/login')}
                                        className="text-purple-600 hover:text-purple-700 font-medium ml-1 transition-colors">
                                            Sign in
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust indicators */}
                    <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-500">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Bank-level Security</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            <span>Instant Transfers</span>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;