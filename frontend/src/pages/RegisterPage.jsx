// frontend/src/pages/RegisterPage.jsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../slices/userSlice';
import { 
  UserPlus, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  LogIn,
  Shield,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  CreditCard,
  XCircle
} from 'lucide-react';

const RegisterPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const { userInfo, loading, error } = useSelector((state) => state.user);

    // Extract redirect from URL
    const sp = new URLSearchParams(location.search);
    const redirect = sp.get('redirect') || '/';

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    useEffect(() => {
        // Calculate password strength
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 1;
        if (password.match(/\d/)) strength += 1;
        if (password.match(/[^a-zA-Z\d]/)) strength += 1;
        setPasswordStrength(strength);
    }, [password]);

    const submitHandler = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            return;
        }

        if (!acceptTerms) {
            return;
        }

        dispatch(register({ name, email, password }));
    };

    const getPasswordStrengthColor = () => {
        switch (passwordStrength) {
            case 0: return 'bg-slate-600';
            case 1: return 'bg-red-500';
            case 2: return 'bg-yellow-500';
            case 3: return 'bg-blue-500';
            case 4: return 'bg-green-500';
            default: return 'bg-slate-600';
        }
    };

    const getPasswordStrengthText = () => {
        switch (passwordStrength) {
            case 0: return 'Very Weak';
            case 1: return 'Weak';
            case 2: return 'Fair';
            case 3: return 'Good';
            case 4: return 'Strong';
            default: return '';
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const passwordsMatch = password === confirmPassword;
    const isFormValid = name && email && password && confirmPassword && acceptTerms && passwordsMatch;

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
                        <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
                            <UserPlus className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold text-white">Create Account</h1>
                    </div>
                    <p className="text-slate-400">
                        Join thousands of happy customers
                    </p>
                </div>

                {/* Register Card */}
                <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-2xl">
                    {/* Error Messages */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 border-opacity-30 rounded-xl">
                            <div className="flex items-center space-x-2 text-red-400">
                                <XCircle className="w-4 h-4" />
                                <span className="text-sm">{error}</span>
                            </div>
                        </div>
                    )}

                    {!passwordsMatch && confirmPassword && (
                        <div className="mb-6 p-4 bg-yellow-500 bg-opacity-20 border border-yellow-500 border-opacity-30 rounded-xl">
                            <div className="flex items-center space-x-2 text-yellow-400">
                                <Shield className="w-4 h-4" />
                                <span className="text-sm">Passwords do not match</span>
                            </div>
                        </div>
                    )}

                    <form onSubmit={submitHandler} className="space-y-6">
                        {/* Name Field */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                                <User className="w-4 h-4 text-blue-400" />
                                <span>Full Name</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Enter your full name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-11 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                                <Mail className="w-4 h-4 text-purple-400" />
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
                                <Lock className="w-4 h-4 text-green-400" />
                                <span>Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    placeholder="Create a strong password"
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
                            
                            {/* Password Strength Meter */}
                            {password && (
                                <div className="mt-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-slate-400 text-sm">Password strength</span>
                                        <span className={`text-sm font-semibold ${
                                            passwordStrength === 4 ? 'text-green-400' :
                                            passwordStrength === 3 ? 'text-blue-400' :
                                            passwordStrength === 2 ? 'text-yellow-400' :
                                            'text-red-400'
                                        }`}>
                                            {getPasswordStrengthText()}
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-700 rounded-full h-2">
                                        <div 
                                            className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                                            style={{ width: `${(passwordStrength / 4) * 100}%` }}
                                        ></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                                <Lock className="w-4 h-4 text-yellow-400" />
                                <span>Confirm Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 pl-11 pr-11 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            
                            {/* Password Match Indicator */}
                            {confirmPassword && (
                                <div className="mt-2">
                                    <div className={`flex items-center space-x-2 text-sm ${
                                        passwordsMatch ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                        {passwordsMatch ? (
                                            <CheckCircle2 className="w-4 h-4" />
                                        ) : (
                                            <XCircle className="w-4 h-4" />
                                        )}
                                        <span>{passwordsMatch ? 'Passwords match' : 'Passwords do not match'}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Terms and Conditions */}
                        <div className="flex items-start space-x-3">
                            <button
                                type="button"
                                onClick={() => setAcceptTerms(!acceptTerms)}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 ${
                                    acceptTerms 
                                        ? 'bg-blue-500 border-blue-500' 
                                        : 'bg-slate-800 border-slate-600'
                                }`}
                            >
                                {acceptTerms && <CheckCircle2 className="w-3 h-3 text-white" />}
                            </button>
                            <div>
                                <span className="text-slate-300 text-sm">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-blue-400 hover:text-blue-300">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-blue-400 hover:text-blue-300">
                                        Privacy Policy
                                    </Link>
                                </span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={loading || !isFormValid}
                            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg shadow-green-500/30"
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    <span>Creating Account...</span>
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-5 h-5" />
                                    <span>Create Account</span>
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

                        </div>
                    </div>



                    {/* Login Link */}
                    <div className="text-center">
                        <p className="text-slate-400">
                            Already have an account?{' '}
                            <Link 
                                to="/login"
                                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors flex items-center justify-center space-x-1 mt-2"
                            >
                                <LogIn className="w-4 h-4" />
                                <span>Sign in to your account</span>
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Benefits */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    {[
                        { icon: Shield, text: "Secure Account", color: "text-green-400" },
                        { icon: CheckCircle2, text: "Instant Access", color: "text-blue-400" },
                        { icon: CreditCard, text: "Faster Checkout", color: "text-purple-400" }
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

export default RegisterPage;