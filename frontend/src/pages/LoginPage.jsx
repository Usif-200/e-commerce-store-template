// frontend/src/pages/LoginPage.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../slices/userSlice';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LogIn, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  Shield,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  CreditCard
} from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get('redirect') || '/';

    const { userInfo, loading, error } = useSelector((state) => state.user);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-12">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <LogIn className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white">Welcome Back</h1>
                    </div>
                    <p className="text-slate-400">
                        Sign in to your account to continue shopping
                    </p>
                </div>

                {/* Login Card */}
                <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-xl">
                            <div className="flex items-center space-x-2 text-red-400">
                                <Shield className="w-4 h-4" />
                                <span className="text-sm">{error}</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-6">
                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-blue-400" />
                                <span>Email Address</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-11 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                                <Lock className="w-4 h-4 text-purple-400" />
                                <span>Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-11 pr-11 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setRememberMe(!rememberMe)}
                                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                                        rememberMe ? 'bg-blue-500' : 'bg-slate-700'
                                    }`}
                                >
                                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
                                        rememberMe ? 'translate-x-7' : 'translate-x-1'
                                    }`} />
                                </button>
                                <span className="text-slate-300 text-sm">Remember me</span>
                            </div>
                            <Link 
                                to="/forgot-password"
                                className="text-blue-400 hover:text-blue-300 text-sm transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    <span>Sign In</span>
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-slate-900 text-slate-400"></span>
                        </div>
                    </div>



                    {/* Register Link */}
                    <div className="text-center">
                        <p className="text-slate-400">
                            Don't have an account?{' '}
                            <Link 
                                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center justify-center space-x-1 mt-2"
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Create an account</span>
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Security Features */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    {[
                        { icon: Shield, text: "Secure Login", color: "text-green-400" },
                        { icon: CheckCircle2, text: "Instant Access", color: "text-blue-400" },
                        { icon: CreditCard, text: "Safe Payments", color: "text-purple-400" }
                    ].map((feature, index) => (
                        <div key={index} className="flex flex-col items-center space-y-2">
                            <feature.icon className={`w-5 h-5 ${feature.color}`} />
                            <span className="text-slate-400 text-sm">{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LoginPage;