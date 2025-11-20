// frontend/src/pages/ProductDetailsPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  Heart,
  Plus,
  Minus,
  ChevronRight
} from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const ProductDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [qty, setQty] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        dispatch(addToCart({
            product: product._id,
            name: product.name,
            imageUrl: product.imageUrl,
            price: product.price,
            countInStock: product.countInStock,
            qty: Number(qty),
        }));
        navigate('/cart'); 
    };

    const increaseQty = () => {
        if (qty < product.countInStock) {
            setQty(qty + 1);
        }
    };

    const decreaseQty = () => {
        if (qty > 1) {
            setQty(qty - 1);
        }
    };

    // Mock images for gallery (in real app, you'd get these from product.images)
    const productImages = [
        product?.imageUrl,
        product?.imageUrl, // duplicate for demo
        product?.imageUrl, // duplicate for demo
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-red-400 text-2xl text-center">
                    Error: {error}
                    <br />
                    <button 
                        onClick={() => navigate(-1)}
                        className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white text-2xl">Product not found</div>
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
                {/* Breadcrumb */}
                <nav className="flex items-center space-x-2 text-slate-400 mb-8">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <ChevronRight className="w-4 h-4" />
                    <Link to="/products" className="hover:text-white transition-colors">Products</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-blue-400">{product.name}</span>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Product Images */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
                            <img 
                                src={productImages[selectedImage]} 
                                alt={product.name}
                                className="w-full h-96 object-contain transform hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Image Gallery */}
                        <div className="flex space-x-4">
                            {productImages.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`flex-1 h-20 bg-slate-900 rounded-xl border-2 transition-all duration-300 ${
                                        selectedImage === index 
                                            ? 'border-blue-500 scale-105' 
                                            : 'border-slate-800 hover:border-slate-700'
                                    }`}
                                >
                                    <img 
                                        src={image} 
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-6">
                        {/* Header */}
                        <div>
                            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                                {product.name}
                            </h1>
                            
                            {/* Rating */}
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i}
                                            className={`w-5 h-5 ${
                                                i < Math.floor(product.rating || 4) 
                                                    ? "text-yellow-400 fill-yellow-400" 
                                                    : "text-slate-600"
                                            }`}
                                        />
                                    ))}
                                </div>
                                <span className="text-slate-400">({product.reviews?.length || 0} reviews)</span>
                                <span className="text-white bg-green-400 bg-opacity-10 px-2 py-1 rounded-full text-sm">
                                    In Stock
                                </span>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline space-x-3 mb-6">
                                <span className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    ${product.price}
                                </span>
                                {product.originalPrice && (
                                    <span className="text-2xl text-slate-500 line-through">
                                        ${product.originalPrice}
                                    </span>
                                )}
                                {product.discount && (
                                    <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                                        Save {product.discount}%
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-slate-900 bg-opacity-50 rounded-2xl p-6 border border-slate-800">
                            <h3 className="text-lg font-semibold text-white mb-3">Description</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {product.description || "Premium quality product with excellent features and performance."}
                            </p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { icon: Truck, text: "Free Shipping", color: "text-green-400" },
                                { icon: Shield, text: "2-Year Warranty", color: "text-blue-400" },
                                { icon: RotateCcw, text: "30-Day Returns", color: "text-purple-400" }
                            ].map((feature, index) => (
                                <div 
                                    key={index}
                                    className="flex flex-col items-center text-center p-4 bg-slate-900 bg-opacity-50 rounded-xl border border-slate-800 hover:border-slate-700 transition-all duration-300"
                                >
                                    <feature.icon className={`w-6 h-6 ${feature.color} mb-2`} />
                                    <span className="text-slate-300 text-sm">{feature.text}</span>
                                </div>
                            ))}
                        </div>

                        {/* Quantity & Actions */}
                        <div className="space-y-6">
                            {/* Quantity Selector */}
                            <div className="flex items-center space-x-4">
                                <span className="text-white font-semibold">Quantity:</span>
                                <div className="flex items-center space-x-3 bg-slate-900 rounded-xl border border-slate-800 p-2">
                                    <button 
                                        onClick={decreaseQty}
                                        disabled={qty <= 1}
                                        className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <Minus className="w-4 h-4 text-white" />
                                    </button>
                                    <span className="text-white font-bold text-lg w-8 text-center">{qty}</span>
                                    <button 
                                        onClick={increaseQty}
                                        disabled={qty >= product.countInStock}
                                        className="w-8 h-8 flex items-center justify-center bg-slate-800 rounded-lg hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                    >
                                        <Plus className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                                <span className="text-slate-400">
                                    {product.countInStock} available
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex space-x-4">
                                <button 
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    <span>Add to Cart</span>
                                </button>
                                
                                <button 
                                    onClick={() => setIsWishlisted(!isWishlisted)}
                                    className={`w-14 h-14 flex items-center justify-center rounded-xl border transition-all duration-300 ${
                                        isWishlisted 
                                            ? 'bg-red-500 border-red-500 text-white' 
                                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                                    }`}
                                >
                                    <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                                </button>
                            </div>
                        </div>

                        {/* Additional Info */}
                        <div className="bg-slate-900 bg-opacity-50 rounded-2xl p-6 border border-slate-800">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-slate-400">Category:</span>
                                    <p className="text-white font-medium">{product.category}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400">SKU:</span>
                                    <p className="text-white font-medium">{product._id}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400">Brand:</span>
                                    <p className="text-white font-medium">{product.brand || 'COCO Store'}</p>
                                </div>
                                <div>
                                    <span className="text-slate-400">Shipping:</span>
                                    <p className="text-white font-medium">Free Worldwide</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-12 text-center">
                    <button 
                        onClick={() => navigate(-1)}
                        className="inline-flex items-center space-x-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all transform hover:scale-105"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Products</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;