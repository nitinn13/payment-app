import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const passwordInputRef = useRef(null);
  const loginButtonRef = useRef(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setErrors({ email: '', password: '' }); // Clear previous errors
    
    try {
      const response = await axios.post('http://localhost:3000/user/login', {
        email,
        password
      });
      localStorage.setItem('token', response.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error('Login failed:', error);
      if (error.response && error.response.status === 401) {
        setErrors({
          email: 'Invalid email or password',
          password: 'Invalid email or password'
        });
      } else {
        setErrors({
          email: 'Login failed. Please try again.',
          password: 'Login failed. Please try again.'
        });
      }
    }
    setIsLoading(false);
  };

  const handleDemoLogin = () => {
    setEmail("nitin@gmail.com");
    setPassword("pass");
    setErrors({ email: '', password: '' }); // Clear errors when using demo
  };

  const handleEmailKeyDown = (event) => {
    if (event.key === 'Enter') {
      passwordInputRef.current.focus();
    }
  };

  const handlePasswordKeyDown = (event) => {
    if (event.key === 'Enter') {
      loginButtonRef.current.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-100 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-32 left-16 w-40 h-40 bg-purple-200 rounded-full opacity-50 blur-2xl"></div>
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-300 rounded-full opacity-60 blur-xl"></div>
      <div className="absolute top-1/3 right-1/4 w-28 h-28 bg-purple-100 rounded-full opacity-40 blur-lg"></div>

      {/* Header */}
      <nav className="flex justify-between items-center px-8 py-6">
        <button
          onClick={() => navigate('/')}
          className="text-2xl font-bold text-purple-600">PayFlow</button>
      </nav>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-100px)] px-4">
        <div className="w-full max-w-md">
          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 relative">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-3xl blur-xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
                <p className="text-gray-600">Sign in to your PayFlow account</p>
              </div>

              <div className="space-y-6">
                {/* Email Input */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                  <div className="relative">
                    <input
                      onChange={e => {
                        setEmail(e.target.value);
                        setErrors({ ...errors, email: '' }); // Clear error when typing
                      }}
                      type="email"
                      value={email}
                      placeholder="Enter your email"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-red-400' : 'border-gray-200'} focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm`}
                      onKeyDown={handleEmailKeyDown}
                    />
                    {/* Email icon */}
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700 block">Password</label>
                  <div className="relative">
                    <input
                      onChange={e => {
                        setPassword(e.target.value);
                        setErrors({ ...errors, password: '' }); // Clear error when typing
                      }}
                      type={showPassword ? "text" : "password"}
                      value={password}
                      placeholder="Enter your password"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.password ? 'border-red-400' : 'border-gray-200'} focus:border-purple-400 focus:ring-4 focus:ring-purple-100 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm pr-12`}
                      onKeyDown={handlePasswordKeyDown}
                      ref={passwordInputRef}
                    />
                    {/* Password toggle button */}
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1 flex items-center">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember me and Forgot password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
                    <span className="text-gray-600">Remember me</span>
                  </label>
                  <button className="text-sm text-purple-600 hover:text-purple-700 font-medium transition-colors">
                    Forgot password?
                  </button>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleLogin}
                  disabled={isLoading || !email || !password}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  ref={loginButtonRef}
                >
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <span>Sign In</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>

                {/* Demo Login Button */}
                <button
                  onClick={handleDemoLogin}
                  className="w-full bg-gray-500 hover:from-gray-600 hover:to-gray-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] flex items-center justify-center space-x-2"
                >
                  <span>Demo Login</span>
                </button>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white/80 text-gray-500">or continue with</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors space-x-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Google</span>
                  </button>
                  <button className="flex items-center justify-center px-4 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors space-x-2">
                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">Facebook</span>
                  </button>
                </div>

                {/* Sign up link */}
                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Don't have an account?
                    <button
                      onClick={() => navigate('/signup')}
                      className="text-purple-600 hover:text-purple-700 font-medium ml-1 transition-colors">
                      Sign up
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
              <span>Secure Login</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>256-bit Encryption</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;