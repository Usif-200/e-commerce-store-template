// frontend/src/pages/PaymentPage.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../slices/cartSlice';
import { 
  CreditCard, 
  DollarSign,  // ✅ بديل عن PayPal
  Building2, 
  Shield, 
  Lock, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Smartphone,
  Wallet
} from 'lucide-react';

const PaymentPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingAddress, paymentMethod: savedPaymentMethod } = useSelector((state) => state.cart);

    useEffect(() => {
        if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [navigate, shippingAddress]);

    const [paymentMethod, setPaymentMethod] = useState(savedPaymentMethod || 'paypal');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [saveCard, setSaveCard] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        
        return parts.length ? parts.join(' ') : value;
    };

    const formatExpiryDate = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (v.length >= 2) {
            return v.substring(0, 2) + (v.length > 2 ? '/' + v.substring(2, 4) : '');
        }
        return v;
    };

    const paymentMethods = [
        {
            id: 'paypal',
            name: 'PayPal',
            icon: DollarSign,  // ✅ استخدمت DollarSign بدل PayPal
            description: 'Pay with your PayPal account',
            color: 'from-blue-500 to-blue-700',
            iconColor: 'text-blue-400',
            popular: true
        },
        {
            id: 'credit-card',
            name: 'Credit Card',
            icon: CreditCard,
            description: 'Pay with Visa, MasterCard, or American Express',
            color: 'from-purple-500 to-purple-700',
            iconColor: 'text-purple-400'
        },
        {
            id: 'apple-pay',
            name: 'Apple Pay',
            icon: Smartphone,
            description: 'Pay with Apple Pay',
            color: 'from-slate-600 to-slate-800',
            iconColor: 'text-slate-400',
            disabled: true
        },
        {
            id: 'bank-transfer',
            name: 'Bank Transfer',
            icon: Building2,
            description: 'Direct bank transfer',
            color: 'from-green-500 to-green-700',
            iconColor: 'text-green-400',
            disabled: true
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-12">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <CreditCard className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">Payment Method</h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Choose your preferred payment method
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Payment Methods */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                            <form onSubmit={submitHandler} className="space-y-6">
                                {/* Payment Method Selection */}
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-white mb-4">Select Payment Method</h3>
                                    {paymentMethods.map((method) => (
                                        <div
                                            key={method.id}
                                            className={`relative p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                                                paymentMethod === method.id
                                                    ? 'border-blue-500 bg-blue-500 bg-opacity-10'
                                                    : method.disabled
                                                    ? 'border-slate-700 bg-slate-800 opacity-50 cursor-not-allowed'
                                                    : 'border-slate-700 bg-slate-800 hover:border-slate-600'
                                            }`}
                                            onClick={() => !method.disabled && setPaymentMethod(method.id)}
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-4">
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center`}>
                                                        <method.icon className={`w-6 h-6 ${method.iconColor}`} />
                                                    </div>
                                                    <div>
                                                        <div className="flex items-center space-x-2">
                                                            <h4 className="text-white font-semibold">{method.name}</h4>
                                                            {method.popular && (
                                                                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                                                                    Popular
                                                                </span>
                                                            )}
                                                            {method.disabled && (
                                                                <span className="bg-slate-600 text-slate-300 px-2 py-1 rounded-full text-xs font-bold">
                                                                    Coming Soon
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-slate-400 text-sm">{method.description}</p>
                                                    </div>
                                                </div>
                                                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                                                    paymentMethod === method.id
                                                        ? 'bg-blue-500 border-blue-500'
                                                        : 'border-slate-600'
                                                }`}>
                                                    {paymentMethod === method.id && (
                                                        <CheckCircle2 className="w-4 h-4 text-white" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Credit Card Form (Conditional) */}
                                {paymentMethod === 'credit-card' && (
                                    <div className="space-y-6 p-6 bg-slate-800 rounded-xl border border-slate-700">
                                        <h4 className="text-lg font-semibold text-white flex items-center space-x-2">
                                            <CreditCard className="w-5 h-5 text-purple-400" />
                                            <span>Card Details</span>
                                        </h4>
                                        
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-white mb-2">
                                                    Cardholder Name
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="John Doe"
                                                    value={cardholderName}
                                                    onChange={(e) => setCardholderName(e.target.value)}
                                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                                />
                                            </div>
                                            
                                            <div>
                                                <label className="block text-sm font-semibold text-white mb-2">
                                                    Card Number
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="1234 5678 9012 3456"
                                                    value={cardNumber}
                                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                                    maxLength={19}
                                                    className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-sm font-semibold text-white mb-2">
                                                        Expiry Date
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="MM/YY"
                                                        value={expiryDate}
                                                        onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                                                        maxLength={5}
                                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-semibold text-white mb-2">
                                                        CVV
                                                    </label>
                                                    <input
                                                        type="text"
                                                        placeholder="123"
                                                        value={cvv}
                                                        onChange={(e) => setCvv(e.target.value.replace(/\D/g, '').slice(0, 3))}
                                                        maxLength={3}
                                                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="flex items-center space-x-3">
                                                <button
                                                    type="button"
                                                    onClick={() => setSaveCard(!saveCard)}
                                                    className={`w-12 h-6 rounded-full transition-all duration-300 ${
                                                        saveCard ? 'bg-purple-500' : 'bg-slate-600'
                                                    }`}
                                                >
                                                    <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
                                                        saveCard ? 'translate-x-7' : 'translate-x-1'
                                                    }`} />
                                                </button>
                                                <span className="text-slate-300 text-sm">
                                                    Save card for future payments
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/shipping')}
                                        className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        <span>Back to Shipping</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
                                    >
                                        <span>Continue to Review</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar - Security & Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-green-400" />
                                <span>Secure Payment</span>
                            </h3>

                            {/* Security Features */}
                            <div className="space-y-4 mb-6">
                                {[
                                    { icon: Lock, text: "256-bit SSL encryption", color: "text-blue-400" },
                                    { icon: Shield, text: "PCI DSS compliant", color: "text-green-400" },
                                    { icon: Wallet, text: "No card details stored", color: "text-purple-400" }
                                ].map((feature, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-800 rounded-xl">
                                        <feature.icon className={`w-5 h-5 ${feature.color}`} />
                                        <span className="text-slate-300 text-sm">{feature.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Accepted Cards */}
                            <div className="mb-6">
                                <h4 className="text-sm font-semibold text-slate-300 mb-3">We Accept</h4>
                                <div className="flex space-x-2">
                                    {['Visa', 'MasterCard', 'PayPal'].map((card) => (
                                        <div key={card} className="flex-1 bg-slate-800 rounded-lg p-2 text-center">
                                            <span className="text-xs text-slate-400">{card}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guarantee */}
                            <div className="p-4 bg-green-500 bg-opacity-10 rounded-xl border border-green-500 border-opacity-30">
                                <div className="flex items-center space-x-2 text-white text-sm">
                                    <CheckCircle2 className="w-9 h-9" />
                                    <span>100% Secure Payment Guarantee</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="mt-12 flex justify-center">
                    <div className="flex items-center space-x-8">
                        {['Cart', 'Shipping', 'Payment', 'Review'].map((step, index) => (
                            <div key={step} className="flex items-center space-x-2">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                    index === 2 
                                        ? 'bg-blue-500 border-blue-500 text-white' 
                                        : index < 2 
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-slate-800 border-slate-700 text-slate-400'
                                }`}>
                                    {index < 2 ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>
                                <span className={`text-sm font-medium ${
                                    index === 2 ? 'text-blue-400' : index < 2 ? 'text-green-400' : 'text-slate-400'
                                }`}>
                                    {step}
                                </span>
                                {index < 3 && (
                                    <div className={`w-8 h-0.5 ${
                                        index < 2 ? 'bg-green-500' : 'bg-slate-700'
                                    }`} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;