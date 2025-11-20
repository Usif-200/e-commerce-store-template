import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/userSlice";
import { ShoppingCart, User, LogOut, Settings, Sparkles } from "lucide-react";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="fixed p-3 alumni-sans-pinstripe-regular top-0 w-full bg-slate-950 bg-opacity-95 backdrop-blur-sm border-b border-slate-800 z-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-10"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 8 + 8}s infinite ease-in-out ${Math.random() * 3}s`,
            }}
          />
        ))}
        
        {/* Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full opacity-5 blur-2xl animate-orb-float"></div>
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-5 blur-2xl animate-orb-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Logo with Animation */}
          <div className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30 transform group-hover:scale-110 transition-transform duration-300 animate-pulse-gentle">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <Link 
              to="/" 
              className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient"
            >
              COCO-Store
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden text-xl md:flex items-center space-x-8">

            <Link
              to="/products"
              className="text-slate-300 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center space-x-1 group"
            >
              <span>Products</span>
              <Sparkles className="w-4 h-4 text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>

            <Link
              to="/cart"
              className="text-slate-300 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group relative"
            >
              <div className="relative">
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  </span>
                )}
              </div>
              <span>Cart</span>
            </Link>

            {/* User menu */}
            {userInfo ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenu(!userMenu)}
                  className="text-slate-300 hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center gap-2 group bg-slate-800 bg-opacity-50 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-700 hover:border-slate-600"
                >
                  <User className="w-4 h-4 text-blue-400" />
                  <span>{userInfo.name}</span>
                  <div className={`transform transition-transform duration-300 ${userMenu ? 'rotate-180' : ''}`}>
                    ▼
                  </div>
                </button>

                {userMenu && (
                  <div className="absolute right-0 mt-2 bg-slate-900 bg-opacity-95 backdrop-blur-sm border border-slate-700 rounded-xl w-48 py-2 shadow-2xl animate-fade-in-up">
                    {userInfo.isAdmin && (
                      <Link
                        to="/admin/product/create"
                        className="flex items-center space-x-2 px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
                        onClick={() => setUserMenu(false)}
                      >
                        <Settings className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
                        <span>Admin Create</span>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logoutHandler();
                        setUserMenu(false);
                      }}
                      className="flex items-center space-x-2 w-full text-left px-4 py-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-200 group"
                    >
                      <LogOut className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 flex items-center space-x-2 animate-bounce-gentle"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button with Enhanced Animation */}
          <button
            className="md:hidden cursor-pointer flex flex-col justify-center items-center w-10 h-10 relative group"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <span 
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                menuOpen ? 'rotate-45 translate-y-1.5 w-7 bg-blue-400' : '-translate-y-1 group-hover:bg-blue-300'
              }`}
            ></span>
            <span 
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1 ${
                menuOpen ? 'opacity-0' : 'opacity-100 group-hover:bg-blue-300'
              }`}
            ></span>
            <span 
              className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                menuOpen ? '-rotate-45 -translate-y-1.5 w-7 bg-purple-400' : 'translate-y-1 group-hover:bg-purple-300'
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu with Animation */}
      <div className={`md:hidden bg-slate-900 bg-opacity-95 backdrop-blur-sm border-t border-slate-800 transition-all duration-500 overflow-hidden ${
        menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-4 py-4 space-y-4">
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
          >
            <Sparkles className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Products</span>
          </Link>

          <Link
            to="/cart"
            onClick={() => setMenuOpen(false)}
            className="flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
          >
            <div className="relative">
              <ShoppingCart className="w-4 h-4 text-purple-400 group-hover:scale-110 transition-transform" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center text-[10px]">
                  {cartItems.reduce((acc, item) => acc + item.qty, 0)}
                </span>
              )}
            </div>
            <span>Cart</span>
          </Link>

          {userInfo ? (
            <>
              {userInfo.isAdmin && (
                <Link
                  to="/admin/product/create"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center space-x-3 text-slate-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
                >
                  <Settings className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                  <span>Admin Create</span>
                </Link>
              )}

              <button
                onClick={() => {
                  logoutHandler();
                  setMenuOpen(false);
                }}
                className="flex items-center space-x-3 w-full text-left text-slate-300 hover:text-white transition-all duration-300 transform hover:translate-x-2 group"
              >
                <LogOut className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg shadow-blue-500/30 transition-all transform hover:scale-105 group"
            >
              <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span>Sign In</span>
            </Link>
          )}
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }

        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(0, -40px) scale(1); }
          75% { transform: translate(-20px, -20px) scale(0.9); }
        }

        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        @keyframes pulse-gentle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .animate-orb-float {
          animation: orb-float 15s ease-in-out infinite;
        }

        .animate-orb-float-delayed {
          animation: orb-float 12s ease-in-out infinite 2s;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s infinite;
        }

        .animate-pulse-gentle {
          animation: pulse-gentle 2s infinite;
        }
      `}</style>
    </nav>
  );
};

export default Header;