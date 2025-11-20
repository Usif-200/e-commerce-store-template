// frontend/src/pages/CartPage.jsx

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag,
  Truck,
  Shield,
  RotateCcw,
  Heart
} from 'lucide-react';

const CartPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);
    const { userInfo } = useSelector((state) => state.user);

    const removeItemHandler = (id) => {
        dispatch(removeFromCart(id));
    };

    const increaseQtyHandler = (item) => {
        if (item.qty < item.countInStock) {
            dispatch(addToCart({ ...item, qty: Number(item.qty) + 1 }));
        }
    };

    const decreaseQtyHandler = (item) => {
        if (item.qty > 1) {
            dispatch(addToCart({ ...item, qty: Number(item.qty) - 1 }));
        }
    };

    const checkoutHandler = () => {
        if (userInfo) {
            navigate('/shipping');
        } else {
            navigate('/login?redirect=/shipping');
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
    const shippingFee = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shippingFee + tax;

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
                            <ShoppingCart className="w-6 h-6 text-white" />
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-bold text-white">Shopping Cart</h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        Review your items and proceed to checkout
                    </p>
                </div>

                {cartItems.length === 0 ? (
                    // Empty Cart State
                    <div className="text-center py-20">
                        <div className="w-32 h-32 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-800">
                            <ShoppingBag className="w-16 h-16 text-slate-600" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
                        <p className="text-slate-400 mb-8 max-w-md mx-auto">
                            Looks like you haven't added any items to your cart yet. Start shopping to discover amazing products!
                        </p>
                        <Link 
                            to="/products"
                            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span>Start Shopping</span>
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div 
                                    key={item.product}
                                    className="bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-slate-700 transition-all duration-300 group"
                                >
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                                        {/* Product Image */}
                                        <Link 
                                            to={`/products/${item.product}`}
                                            className="flex-shrink-0"
                                        >
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.name}
                                                className="w-24 h-24 object-cover rounded-2xl transform group-hover:scale-105 transition-transform duration-300"
                                            />
                                        </Link>

                                        {/* Product Info */}
                                        <div className="flex-1 min-w-0">
                                            <Link 
                                                to={`/products/${item.product}`}
                                                className="block"
                                            >
                                                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors truncate">
                                                    {item.name}
                                                </h3>
                                            </Link>
                                            <div className="flex items-center space-x-4 text-slate-400">
                                                <span className="text-lg font-bold text-blue-400">
                                                    ${item.price}
                                                </span>
                                                <span className="text-sm">
                                                    In Stock: {item.countInStock}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center space-x-3 bg-slate-800 rounded-xl border border-slate-700 p-2">
                                            <button 
                                                onClick={() => decreaseQtyHandler(item)}
                                                disabled={item.qty <= 1}
                                                className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                <Minus className="w-4 h-4 text-white" />
                                            </button>
                                            <span className="text-white font-bold text-lg w-8 text-center">
                                                {item.qty}
                                            </span>
                                            <button 
                                                onClick={() => increaseQtyHandler(item)}
                                                disabled={item.qty >= item.countInStock}
                                                className="w-8 h-8 flex items-center justify-center bg-slate-700 rounded-lg hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                            >
                                                <Plus className="w-4 h-4 text-white" />
                                            </button>
                                        </div>

                                        {/* Item Total & Remove */}
                                        <div className="flex items-center space-x-4">
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-white">
                                                    ${(item.qty * item.price).toFixed(2)}
                                                </div>
                                                <div className="text-sm text-slate-400">
                                                    ${item.price} each
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeItemHandler(item.product)}
                                                className="w-10 h-10 flex items-center justify-center bg-red-500 bg-opacity-20 hover:bg-red-500 hover:bg-opacity-30 rounded-xl border border-red-500 border-opacity-30 text-red-400 hover:text-white transition-all transform hover:scale-110"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 sticky top-24">
                                <h2 className="text-2xl font-bold text-white mb-6 flex items-center space-x-2">
                                    <ShoppingCart className="w-6 h-6 text-blue-400" />
                                    <span>Order Summary</span>
                                </h2>

                                {/* Order Details */}
                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Items ({totalItems})</span>
                                        <span className="text-white font-semibold">${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Shipping</span>
                                        <span className="text-white font-semibold">
                                            {shippingFee === 0 ? 'FREE' : `$${shippingFee}`}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-slate-400">Tax</span>
                                        <span className="text-white font-semibold">${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="border-t border-slate-800 pt-4">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-white">Total</span>
                                            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Features */}
                                <div className="space-y-3 mb-6">
                                    {[
                                        { icon: Truck, text: "Free shipping on orders over $100", color: "text-green-400" },
                                        { icon: Shield, text: "Secure payment processing", color: "text-blue-400" },
                                        { icon: RotateCcw, text: "30-day return policy", color: "text-purple-400" }
                                    ].map((feature, index) => (
                                        <div key={index} className="flex items-center space-x-3 text-sm">
                                            <feature.icon className={`w-4 h-4 ${feature.color}`} />
                                            <span className="text-slate-400">{feature.text}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Checkout Button */}
                                <button 
                                    onClick={checkoutHandler}
                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg shadow-blue-500/30"
                                >
                                    <span>Proceed to Checkout</span>
                                    <ArrowRight className="w-5 h-5" />
                                </button>

                                {/* Continue Shopping */}
                                <Link 
                                    to="/products"
                                    className="block w-full text-center mt-4 text-slate-400 hover:text-white transition-colors"
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Recently Viewed / Recommendations (Optional) */}
                {cartItems.length > 0 && (
                    <div className="mt-16">
                        <h3 className="text-2xl font-bold text-white mb-6">You might also like</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Placeholder for recommended products */}
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="bg-slate-900 rounded-2xl p-4 border border-slate-800 hover:border-slate-700 transition-all duration-300 opacity-50">
                                    <div className="w-full h-32 bg-slate-800 rounded-lg mb-3"></div>
                                    <div className="h-4 bg-slate-800 rounded mb-2"></div>
                                    <div className="h-3 bg-slate-800 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;