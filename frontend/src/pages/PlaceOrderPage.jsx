// frontend/src/pages/PlaceOrderPage.jsx

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { clearCartItems } from '../slices/cartSlice';
import { 
  Package,
  Truck,
  CreditCard,
  MapPin,
  CheckCircle2,
  Shield,
  ArrowRight,
  ArrowLeft,
  Clock,
  Star
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const PlaceOrderPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, shippingAddress, paymentMethod } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    
    // توجيه المستخدم إذا لم تكتمل خطوات الدفع
    useEffect(() => {
        if (!paymentMethod) {
            navigate('/payment');
        } else if (!shippingAddress.address) {
            navigate('/shipping');
        }
    }, [navigate, paymentMethod, shippingAddress]);

    // حساب الأسعار
    const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = 0.15 * itemsPrice;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    const placeOrderHandler = async () => {
        setLoading(true);
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };
            
            const { data } = await axios.post(
                `${API_URL}/api/orders`,
                {
                    orderItems: cartItems.map(item => ({
                        name: item.name,
                        qty: item.qty,
                        imageUrl: item.imageUrl,
                        price: item.price,
                        product: item.product,
                    })),
                    shippingAddress,
                    paymentMethod,
                    itemsPrice: itemsPrice.toFixed(2),
                    shippingPrice: shippingPrice.toFixed(2),
                    taxPrice: taxPrice.toFixed(2),
                    totalPrice: totalPrice.toFixed(2),
                },
                config
            );
            
            dispatch(clearCartItems());
            navigate(`/order/${data._id}`);
            
        } catch (err) {
            alert(`Error placing order: ${err.response?.data?.message || err.message}`);
        } finally {
            setLoading(false);
        }
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-950 pt-20 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800">
                        <Package className="w-16 h-16 text-slate-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                    <p className="text-slate-400 mb-8">Add some items to your cart to place an order.</p>
                    <Link 
                        to="/products"
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
                    >
                        <span>Continue Shopping</span>
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-12">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">Review Order</h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Review your order details before placing
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Shipping Address */}
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-blue-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-blue-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">Shipping Address</h2>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-300">
                                <div>
                                    <span className="text-slate-400 text-sm">Address</span>
                                    <p className="font-medium">{shippingAddress.address}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 text-sm">City</span>
                                    <p className="font-medium">{shippingAddress.city}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 text-sm">Postal Code</span>
                                    <p className="font-medium">{shippingAddress.postalCode}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 text-sm">Country</span>
                                    <p className="font-medium">{shippingAddress.country}</p>
                                </div>
                                {shippingAddress.phone && (
                                    <div className="sm:col-span-2">
                                        <span className="text-slate-400 text-sm">Phone</span>
                                        <p className="font-medium">{shippingAddress.phone}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="w-10 h-10 bg-green-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 text-green-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">Payment Method</h2>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                                    <CreditCard className="w-6 h-6 text-purple-400" />
                                </div>
                                <div>
                                    <p className="text-white font-semibold capitalize">
                                        {paymentMethod === 'paypal' ? 'PayPal' : 
                                         paymentMethod === 'credit-card' ? 'Credit Card' : paymentMethod}
                                    </p>
                                    <p className="text-slate-400 text-sm">
                                        {paymentMethod === 'paypal' ? 'Pay with PayPal account' : 
                                         'Pay with credit or debit card'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <Package className="w-5 h-5 text-purple-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">Order Items ({cartItems.length})</h2>
                            </div>
                            <div className="space-y-4">
                                {cartItems.map((item) => (
                                    <div key={item.product} className="flex items-center space-x-4 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300">
                                        <Link to={`/products/${item.product}`} className="flex-shrink-0">
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg transform hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/products/${item.product}`} className="block">
                                                <h3 className="text-white font-semibold hover:text-blue-400 transition-colors truncate">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center space-x-4 mt-1 text-slate-400 text-sm">
                                                <span>Qty: {item.qty}</span>
                                                <span>${item.price} each</span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-lg font-bold text-white">
                                                ${(item.qty * item.price).toFixed(2)}
                                            </div>
                                            <div className="text-sm text-slate-400">
                                                ${item.price} × {item.qty}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 sticky top-24">
                            <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                                <CheckCircle2 className="w-6 h-6 text-green-400" />
                                <span>Order Summary</span>
                            </h2>

                            {/* Price Breakdown */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Items ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</span>
                                    <span className="text-white font-semibold">${itemsPrice.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Shipping</span>
                                    <span className="text-white font-semibold">
                                        {shippingPrice === 0 ? 'FREE' : `$${shippingPrice.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Tax (15%)</span>
                                    <span className="text-white font-semibold">${taxPrice.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-slate-800 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-white">Total</span>
                                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            ${totalPrice.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Estimate */}
                            <div className="bg-blue-500 bg-opacity-10 rounded-xl p-4 border border-blue-500 border-opacity-30 mb-6">
                                <div className="flex items-center space-x-2 text-white text-sm">
                                    <Truck className="w-4 h-4" />
                                    <span>Estimated delivery: 3-5 business days</span>
                                </div>
                            </div>

                            {/* Security Badge */}
                            <div className="bg-green-500 bg-opacity-10 rounded-xl p-4 border border-green-500 border-opacity-30 mb-6">
                                <div className="flex items-center space-x-2 text-white text-sm">
                                    <Shield className="w-4 h-4" />
                                    <span>Your payment is secure and encrypted</span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button 
                                    onClick={placeOrderHandler}
                                    disabled={loading || cartItems.length === 0}
                                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2 shadow-lg shadow-green-500/30"
                                >
                                    {loading ? (
                                        <>
                                            <Clock className="w-5 h-5 animate-spin" />
                                            <span>Processing...</span>
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle2 className="w-5 h-5" />
                                            <span>Place Order</span>
                                        </>
                                    )}
                                </button>
                                
                                <button
                                    onClick={() => navigate('/payment')}
                                    className="w-full px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span>Back to Payment</span>
                                </button>
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
                                    index === 3 
                                        ? 'bg-green-500 border-green-500 text-white' 
                                        : index < 3 
                                        ? 'bg-green-500 border-green-500 text-white'
                                        : 'bg-slate-800 border-slate-700 text-slate-400'
                                }`}>
                                    {index < 3 ? (
                                        <CheckCircle2 className="w-5 h-5" />
                                    ) : (
                                        <span>{index + 1}</span>
                                    )}
                                </div>
                                <span className={`text-sm font-medium ${
                                    index === 3 ? 'text-green-400' : index < 3 ? 'text-green-400' : 'text-slate-400'
                                }`}>
                                    {step}
                                </span>
                                {index < 3 && (
                                    <div className={`w-8 h-0.5 ${
                                        index < 3 ? 'bg-green-500' : 'bg-slate-700'
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

export default PlaceOrderPage;