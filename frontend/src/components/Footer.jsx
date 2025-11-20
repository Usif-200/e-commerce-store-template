import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  Twitter,
  Github,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  Sparkles,
  Shield,
  Truck,
  Zap,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 transform group-hover:scale-110 transition-transform duration-300">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                COCO-Store
              </h2>
            </div>
            <p className="text-slate-400 leading-relaxed text-lg">
              Your trusted destination for premium tech products with fast delivery and exclusive deals.
            </p>
            
            {/* Features Badges */}
            <div className="flex flex-wrap gap-2 mt-4">
              <div className="flex items-center space-x-1 px-3 py-1 bg-slate-800 bg-opacity-50 rounded-full border border-slate-700">
                <Truck className="w-3 h-3 text-green-400" />
                <span className="text-xs text-slate-300">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-slate-800 bg-opacity-50 rounded-full border border-slate-700">
                <Shield className="w-3 h-3 text-blue-400" />
                <span className="text-xs text-slate-300">Secure</span>
              </div>
              <div className="flex items-center space-x-1 px-3 py-1 bg-slate-800 bg-opacity-50 rounded-full border border-slate-700">
                <Zap className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-slate-300">Fast</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Quick Links</span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "All Products", path: "/products" },
                { name: "Featured", path: "/products?featured=true" },
                { name: "New Arrivals", path: "/products?new=true" },
                { name: "Best Sellers", path: "/products?bestsellers=true" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 flex items-center space-x-1 group"
                  >
                    <div className="w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span>Support</span>
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Contact Us", path: "/" },
                { name: "FAQ", path: "/" },
                { name: "Shipping Info", path: "/" },
                { name: "Returns", path: "/" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    to={link.path}
                    className="text-slate-400 hover:text-white transition-all duration-300 transform hover:translate-x-1 flex items-center space-x-1 group"
                  >
                    <div className="w-1 h-1 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 flex items-center space-x-2">
              <Mail className="w-4 h-4 text-purple-400" />
              <span>Get in Touch</span>
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 group transform hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-blue-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-slate-400 group-hover:text-white">+20 111 222 333</span>
              </div>
              
              <div className="flex items-center space-x-3 group transform hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-purple-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-slate-400 group-hover:text-white">support@cocostore.com</span>
              </div>
              
              <div className="flex items-center space-x-3 group transform hover:scale-105 transition-transform duration-300">
                <div className="w-8 h-8 bg-green-500 bg-opacity-20 rounded-lg flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-slate-400 group-hover:text-white">Cairo, Egypt</span>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-3">Follow Us</h4>
              <div className="flex items-center space-x-3">
                {[
                  { icon: Facebook, color: "hover:text-blue-400", bg: "hover:bg-blue-500 hover:bg-opacity-20" },
                  { icon: Instagram, color: "hover:text-pink-400", bg: "hover:bg-pink-500 hover:bg-opacity-20" },
                  { icon: Twitter, color: "hover:text-cyan-400", bg: "hover:bg-cyan-500 hover:bg-opacity-20" },
                  { icon: Github, color: "hover:text-slate-400", bg: "hover:bg-slate-500 hover:bg-opacity-20" },
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className={`w-10 h-10 bg-slate-800 bg-opacity-50 rounded-xl flex items-center justify-center border border-slate-700 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 ${social.color} ${social.bg}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-500 text-sm">
              © {new Date().getFullYear()} <span className="text-blue-400 font-semibold">COCO-Store</span>. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-500">
              <Link to="/" className="hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/" className="hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/\" className="hover:text-white transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;