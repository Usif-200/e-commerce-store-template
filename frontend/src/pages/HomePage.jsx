import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Sparkles, TrendingUp, Shield, Zap, Star, ChevronRight, Truck, Clock, Headphones, Award, Eye } from 'lucide-react';

const HomePage = () => {
  const [email, setEmail] = useState('');

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Secure Payment',
      description: 'Bank-level encryption protects your transactions',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Fast Delivery',
      description: 'Express shipping within 24-48 hours nationwide',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: 'Premium Quality',
      description: 'Curated products with 30-day money-back guarantee',
      color: 'from-amber-500 to-orange-500'
    }
  ];

  const products = [
    {
      id: '691e2a68f0976aacd834ed84',
      name: 'Wireless Earbuds Pro',
      price: '$129.99',
      originalPrice: '$199.99',
      image: 'https://images.unsplash.com/photo-1574920164507-e651b363da83?q=80&w=500&h=500&fit=crop',
      category: 'Audio',
      rating: 4.8,
      isNew: true
    },
    {
      id: '691e2a9cf0976aacd834ed87',
      name: 'Smart Watch Series X',
      price: '$299.99',
      originalPrice: '$399.99',
      image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=500&h=500&fit=crop',
      category: 'Wearables',
      rating: 4.6,
      isHot: true
    },
    {
      id: '691e2ad2f0976aacd834ed8a',
      name: 'Gaming Keyboard RGB',
      price: '$89.99',
      originalPrice: '$129.99',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop',
      category: 'Gaming',
      rating: 4.7
    },
    {
      id: '691e2b06f0976aacd834ed8d',
      name: 'Bluetooth Speaker',
      price: '$79.99',
      originalPrice: '$119.99',
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
      category: 'Audio',
      rating: 4.5,
      isNew: true
    }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Customers', icon: <Star className="w-6 h-6" /> },
    { number: '24/7', label: 'Customer Support', icon: <Headphones className="w-6 h-6" /> },
    { number: '2Y', label: 'Warranty', icon: <Award className="w-6 h-6" /> },
    { number: '48h', label: 'Fast Delivery', icon: <Clock className="w-6 h-6" /> }
  ];

  const handleSubscribe = () => {
    if (email) {
      alert(`Thanks for subscribing with ${email}!`);
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen  alumni-sans-pinstripe-regular bg-slate-950">
      {/* Hero Section */}
      <section className="relative pt-20 min-h-screen flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out ${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Animated Gradient Orbs */}
          <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-20 blur-3xl animate-orb-float"></div>
          <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-20 blur-3xl animate-orb-float delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 blur-3xl animate-orb-float delay-4000"></div>

          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
              animation: 'gridMove 20s linear infinite'
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="text-center lg:text-left space-y-8">
              {/* Main Heading with Typing Effect */}
              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight">
                  Discover Premium
                  <span className="block bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient">
                    Tech & Lifestyle
                  </span>
                </h1>
                
                <p className="text-2xl text-white max-w-2xl leading-relaxed animate-fade-in-up">
                  Curated collection of cutting-edge products at unbeatable prices. 
                  Experience shopping redefined with exclusive discounts up to 50% OFF!
                </p>
              </div>

              {/* Discount Banner */}
              <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-shake">
                <div className="flex items-center justify-center space-x-4">
                  <Zap className="w-8 h-8 text-yellow-300 animate-ping" />
                  <div className="text-center">
                    <p className="text-white font-bold text-lg">FLASH SALE!</p>
                    <p className="text-yellow-300 text-sm">Up to 50% OFF on Selected Items</p>
                  </div>
                  <Sparkles className="w-8 h-8 text-yellow-300 animate-pulse" />
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 text-center lg:text-left">
                {[
                  { icon: Truck, text: "Free Shipping", color: "text-green-400" },
                  { icon: Shield, text: "2-Year Warranty", color: "text-blue-400" },
                  { icon: Zap, text: "Fast Delivery", color: "text-yellow-400" }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center lg:justify-start space-x-2 p-3 bg-slate-800 bg-opacity-50 rounded-lg backdrop-blur-sm hover:bg-slate-700 transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <feature.icon className={`w-5 h-5 ${feature.color} animate-pulse`} />
                    <span className="text-white text-xl font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link to='/products' className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center space-x-2 animate-bounce-gentle">
                  <span>Shop Now</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

              </div>
            </div>

            {/* Image Side */}
            <div className="relative">
              {/* Main Product Image */}
              <div className="relative animate-float">
                <img
                  src="https://images.unsplash.com/photo-1673726803855-695741a96051?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Premium Tech Products"
                  className="rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Discount Badge */}
                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-2xl shadow-2xl animate-pulse rotate-12">
                  <div className="text-center">
                    <p className="font-bold text-lg">50% OFF</p>
                    <p className="text-xs">Today Only!</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -bottom-6 -left-6 bg-slate-800 p-4 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <Truck className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold">Free Delivery</p>
                      <p className="text-slate-400 text-sm">On orders over $99</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Background Decorative Elements */}
              <div className="absolute -z-10 top-10 -right-10 w-64 h-64 bg-blue-500 rounded-full opacity-10 blur-2xl animate-pulse"></div>
              <div className="absolute -z-10 bottom-10 -left-10 w-64 h-64 bg-purple-500 rounded-full opacity-10 blur-2xl animate-pulse delay-1000"></div>
            </div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 px-4 bg-slate-900 bg-opacity-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500 rounded-full opacity-5 blur-2xl"></div>
          <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-purple-500 rounded-full opacity-5 blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center group transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - الجزء المعدل */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-500 bg-opacity-10 border border-blue-500 border-opacity-30 rounded-full mb-4">
              <TrendingUp className="w-4 h-4 text-white" />
              <span className="text-lg text-white font-medium">Trending Now</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Featured Products
            </h2>
            <p className="text-white text-xl max-w-2xl mx-auto">
              Discover our handpicked selection of premium tech products with exclusive discounts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <div 
                key={product.id}
                className="group bg-slate-900 rounded-3xl p-6 border border-slate-800 hover:border-blue-500 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Product Image */}
                <div className="relative mb-4 overflow-hidden rounded-2xl">
                  <Link to={`/products/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col space-y-2">
                    {product.isNew && (
                      <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        NEW
                      </span>
                    )}
                    {product.isHot && (
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                        HOT
                      </span>
                    )}
                  </div>

                  {/* Discount Badge */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white px-2 py-1 rounded-full text-xs font-bold">
                    SALE
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-sm font-medium">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-slate-400 text-sm">{product.rating}</span>
                    </div>
                  </div>

                  <Link to={`/products/${product.id}`}>
                    <h3 className="text-white font-semibold text-lg group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-white">{product.price}</span>
                    <span className="text-slate-500 line-through text-sm">{product.originalPrice}</span>
                  </div>

                  {/* زر View Details - بيودي على صفحة التفاصيل */}
                  <Link 
                    to={`/products/${product.id}`}
                    className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-center group"
                  >
                    <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>View Details</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* زر View All Products */}
          <div className="text-center mt-12">
            <Link 
              to="/products"
              className="inline-flex items-center space-x-2 px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all transform hover:scale-105 backdrop-blur-sm"
            >
              <span>View All Products</span>
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-900 bg-opacity-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-48 h-48 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-48 h-48 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-slate-400 text-lg">
              Experience the difference with our premium service and exclusive benefits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-slate-900 rounded-3xl p-8 border border-slate-800 hover:border-slate-700 transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-lg">
                  {feature.description}
                </p>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-500 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="max-w-4xl mx-auto relative z-10">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 overflow-hidden border border-slate-700 shadow-2xl">
            <div className="relative z-10 text-center space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold text-white">
                Join 100,000+ Happy Customers
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Subscribe to our newsletter and get exclusive deals, early access to sales, and insider tips.
              </p>
              
              <div className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    className="flex-1 px-6 py-4 rounded-xl bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-white shadow-lg transform transition-all duration-300 focus:scale-105"
                  />
                  <button 
                    onClick={handleSubscribe}
                    className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all transform hover:scale-105 shadow-lg whitespace-nowrap flex items-center justify-center space-x-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Subscribe</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10"></div>
          </div>
        </div>
      </section>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, -50px) scale(1.1); }
          50% { transform: translate(0, -100px) scale(1); }
          75% { transform: translate(-50px, -50px) scale(0.9); }
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        .animate-orb-float {
          animation: orb-float 20s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 6s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;