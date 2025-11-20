// frontend/src/pages/OrderPage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { 
  Package,
  Truck,
  CreditCard,
  MapPin,
  CheckCircle2,
  XCircle,
  Clock,
  User,
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  Download,
  Shield,
  Star
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const OrderPage = () => {
    const { id: orderId } = useParams();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!userInfo) {
                navigate('/login');
                return;
            }
            
            try {
                setLoading(true);
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                
                const { data } = await axios.get(`${API_URL}/api/orders/${orderId}`, config);
                setOrder(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };

        fetchOrder();
    }, [orderId, userInfo, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 pt-20 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-white">Loading Order Details...</h2>
                    <p className="text-slate-400 mt-2">Please wait while we fetch your order information</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 pt-20 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Error Loading Order</h2>
                    <p className="text-red-400 mb-6">{error}</p>
                    <button 
                        onClick={() => navigate('/orders')}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
                    >
                        View All Orders
                    </button>
                </div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-950 pt-20 pb-12 flex items-center justify-center">
                <div className="text-center">
                    <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Order Not Found</h2>
                    <p className="text-slate-400 mb-6">The order you're looking for doesn't exist.</p>
                    <button 
                        onClick={() => navigate('/products')}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-20 pb-12">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                            <Package className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">Order Details</h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Order #: <span className="text-blue-400 font-mono">{order._id}</span>
                    </p>
                </div>

                {/* Back Button */}
                <div className="mb-8">
                    <button 
                        onClick={() => navigate('/orders')}
                        className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all transform hover:scale-105"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span>Back to Orders</span>
                    </button>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Order Details */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Order Status */}
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h2 className="text-xl font-semibold text-white mb-2">Order Status</h2>
                                    <p className="text-slate-400">Placed on {formatDate(order.createdAt)}</p>
                                </div>
                                <div className={`px-4 py-2 rounded-full font-semibold ${
                                    order.isDelivered 
                                        ? 'bg-green-500 text-white' 
                                        : order.isPaid
                                        ? 'bg-yellow-500 text-white'
                                        : 'bg-blue-500 text-white'
                                }`}>
                                    {order.isDelivered ? 'Delivered' : order.isPaid ? 'Processing' : 'Pending'}
                                </div>
                            </div>

                            {/* Status Timeline */}
                            <div className="flex items-center justify-between">
                                {[
                                    { status: 'Ordered', active: true, date: order.createdAt },
                                    { status: 'Paid', active: order.isPaid, date: order.paidAt },
                                    { status: 'Shipped', active: order.isShipped, date: order.shippedAt },
                                    { status: 'Delivered', active: order.isDelivered, date: order.deliveredAt }
                                ].map((step, index) => (
                                    <div key={step.status} className="flex flex-col items-center">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                                            step.active
                                                ? 'bg-green-500 border-green-500 text-white'
                                                : 'bg-slate-800 border-slate-700 text-slate-400'
                                        }`}>
                                            {step.active ? (
                                                <CheckCircle2 className="w-5 h-5" />
                                            ) : (
                                                <span>{index + 1}</span>
                                            )}
                                        </div>
                                        <span className={`text-sm font-medium mt-2 ${
                                            step.active ? 'text-green-400' : 'text-slate-400'
                                        }`}>
                                            {step.status}
                                        </span>
                                        {step.date && (
                                            <span className="text-xs text-slate-500 mt-1">
                                                {formatDate(step.date)}
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

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
                                    <p className="font-medium">{order.shippingAddress.address}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 text-sm">City</span>
                                    <p className="font-medium">{order.shippingAddress.city}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 text-sm">Postal Code</span>
                                    <p className="font-medium">{order.shippingAddress.postalCode}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400 text-sm">Country</span>
                                    <p className="font-medium">{order.shippingAddress.country}</p>
                                </div>
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
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="w-12 h-12 bg-slate-800 rounded-xl flex items-center justify-center border border-slate-700">
                                        <CreditCard className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-white font-semibold capitalize">
                                            {order.paymentMethod}
                                        </p>
                                        <p className="text-slate-400 text-sm">
                                            {order.isPaid 
                                                ? `Paid on ${formatDate(order.paidAt)}` 
                                                : 'Payment pending'
                                            }
                                        </p>
                                    </div>
                                </div>
                                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    order.isPaid 
                                        ? 'bg-green-500 text-white' 
                                        : 'bg-yellow-500 text-white'
                                }`}>
                                    {order.isPaid ? 'Paid' : 'Pending'}
                                </div>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800">
                            <div className="flex items-center space-x-3 mb-6">
                                <div className="w-10 h-10 bg-purple-500 bg-opacity-20 rounded-xl flex items-center justify-center">
                                    <Package className="w-5 h-5 text-purple-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-white">Order Items ({order.orderItems.length})</h2>
                            </div>
                            <div className="space-y-4">
                                {order.orderItems.map((item, index) => (
                                    <div key={index} className="flex items-center space-x-4 p-4 bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-600 transition-all duration-300">
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
                                    <span className="text-slate-400">Items</span>
                                    <span className="text-white font-semibold">${order.itemsPrice?.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Shipping</span>
                                    <span className="text-white font-semibold">
                                        {order.shippingPrice === 0 ? 'FREE' : `$${order.shippingPrice?.toFixed(2)}`}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Tax</span>
                                    <span className="text-white font-semibold">${order.taxPrice?.toFixed(2)}</span>
                                </div>
                                <div className="border-t border-slate-800 pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold text-white">Total</span>
                                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                            ${order.totalPrice?.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Info */}
                            <div className="bg-blue-500 bg-opacity-10 rounded-xl p-4 border border-blue-500 border-opacity-30 mb-6">
                                <div className="flex items-center space-x-2 text-white text-sm mb-2">
                                    <Truck className="w-9 h-9" />
                                    <span>Delivery Status</span>
                                </div>
                                <p className="text-white text-sm">
                                    {order.isDelivered 
                                        ? `Delivered on ${formatDate(order.deliveredAt)}`
                                        : 'Your order is being processed'
                                    }
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="space-y-3">

                                
                                <Link 
                                    to="/products"
                                    className="block w-full text-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderPage;