// frontend/src/pages/ShippingPage.jsx

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import { 
  Truck, 
  MapPin, 
  ArrowRight, 
  ArrowLeft,
  Shield,
  Clock,
  CheckCircle2
} from 'lucide-react';

const ShippingPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { shippingAddress } = useSelector((state) => state.cart);

    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || '');
    const [country, setCountry] = useState(shippingAddress?.country || '');
    const [phone, setPhone] = useState(shippingAddress?.phone || '');
    const [saveAddress, setSaveAddress] = useState(true);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveShippingAddress({ 
            address, 
            city, 
            postalCode, 
            country,
            phone 
        }));
        navigate('/payment');
    };

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
                            <Truck className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">Shipping Address</h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Enter your delivery information
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                            <form onSubmit={submitHandler} className="space-y-6">
                                {/* Address Line */}
                                <div>
                                    <label htmlFor="address" className="block text-sm font-semibold text-white mb-3 flex items-center space-x-2">
                                        <MapPin className="w-4 h-4 text-blue-400" />
                                        <span>Street Address</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="address"
                                        placeholder="Enter your street address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                    />
                                </div>

                                {/* City & Postal Code */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="city" className="block text-sm font-semibold text-white mb-3">
                                            City
                                        </label>
                                        <input
                                            type="text"
                                            id="city"
                                            placeholder="Enter city"
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="postalCode" className="block text-sm font-semibold text-white mb-3">
                                            Postal Code
                                        </label>
                                        <input
                                            type="text"
                                            id="postalCode"
                                            placeholder="Enter postal code"
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Country & Phone */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="country" className="block text-sm font-semibold text-white mb-3">
                                            Country
                                        </label>
                                        <select
                                            id="country"
                                            value={country}
                                            onChange={(e) => setCountry(e.target.value)}
                                            required
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        >
                                            <option value="">Select Country</option>
                                            <option value="Egypt">Egypt</option>
                                            <option value="United States">United States</option>
                                            <option value="United Kingdom">United Kingdom</option>
                                            <option value="Canada">Canada</option>
                                            <option value="Germany">Germany</option>
                                            <option value="France">France</option>
                                            <option value="UAE">United Arab Emirates</option>
                                            <option value="Saudi Arabia">Saudi Arabia</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-semibold text-white mb-3">
                                            Phone Number
                                        </label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            placeholder="+20 123 456 7890"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                        />
                                    </div>
                                </div>

                                {/* Save Address Toggle */}
                                <div className="flex items-center space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setSaveAddress(!saveAddress)}
                                        className={`w-12 h-6 rounded-full transition-all duration-300 ${
                                            saveAddress ? 'bg-blue-500' : 'bg-slate-700'
                                        }`}
                                    >
                                        <div className={`w-4 h-4 rounded-full bg-white transform transition-transform duration-300 ${
                                            saveAddress ? 'translate-x-7' : 'translate-x-1'
                                        }`} />
                                    </button>
                                    <span className="text-slate-300 text-sm">
                                        Save this address for future orders
                                    </span>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <button
                                        type="button"
                                        onClick={() => navigate('/cart')}
                                        className="flex-1 px-6 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                                    >
                                        <ArrowLeft className="w-5 h-5" />
                                        <span>Back to Cart</span>
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
                                    >
                                        <span>Continue to Payment</span>
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Sidebar - Shipping Info */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 sticky top-24">
                            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
                                <Shield className="w-5 h-5 text-green-400" />
                                <span>Delivery Information</span>
                            </h3>

                            {/* Shipping Options */}
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700">
                                    <div className="flex items-center space-x-3">
                                        <Truck className="w-5 h-5 text-blue-400" />
                                        <div>
                                            <div className="text-white font-semibold">Standard Delivery</div>
                                            <div className="text-slate-400 text-sm">3-5 business days</div>
                                        </div>
                                    </div>
                                    <div className="text-green-400 font-bold">FREE</div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-slate-800 rounded-xl border border-slate-700 opacity-60">
                                    <div className="flex items-center space-x-3">
                                        <Clock className="w-5 h-5 text-yellow-400" />
                                        <div>
                                            <div className="text-white font-semibold">Express Delivery</div>
                                            <div className="text-slate-400 text-sm">1-2 business days</div>
                                        </div>
                                    </div>
                                    <div className="text-white font-bold">$9.99</div>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-slate-300 mb-3">Delivery Benefits</h4>
                                {[
                                    { icon: CheckCircle2, text: "Free shipping on orders over $100", color: "text-green-400" },
                                    { icon: CheckCircle2, text: "Real-time tracking", color: "text-blue-400" },
                                    { icon: CheckCircle2, text: "Contactless delivery", color: "text-purple-400" },
                                    { icon: CheckCircle2, text: "Easy returns within 30 days", color: "text-yellow-400" }
                                ].map((benefit, index) => (
                                    <div key={index} className="flex items-center space-x-3 text-sm">
                                        <benefit.icon className={`w-4 h-4 ${benefit.color}`} />
                                        <span className="text-slate-400">{benefit.text}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Security Badge */}
                            <div className="mt-6 p-4 bg-green-500 bg-opacity-10 rounded-xl border border-green-500 border-opacity-30">
                                <div className="flex items-center space-x-2 text-white text-sm">
                                    <Shield className="w-9 h-9" />
                                    <span>Your information is secure and encrypted</span>
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
                                    index === 1 
                                        ? 'bg-blue-500 border-blue-500 text-white' 
                                        : index < 1 
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-slate-800 border-slate-700 text-slate-400'
                                }`}>
                                    {index < 1 ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>
                                <span className={`text-sm font-medium ${
                                    index === 1 ? 'text-blue-400' : index < 1 ? 'text-green-400' : 'text-slate-400'
                                }`}>
                                    {step}
                                </span>
                                {index < 3 && (
                                    <div className={`w-8 h-0.5 ${
                                        index < 1 ? 'bg-green-500' : 'bg-slate-700'
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

export default ShippingPage;