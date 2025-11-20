// frontend/src/pages/ProductPage.jsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';

const ProductPage = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="text-center text-white text-3xl py-20">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 text-2xl py-20">
        Error: {error}
      </div>
    );
  }

  return (
    <section id="products" className="py-20 px-4 bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Latest Products
          </h2>
          <p className="text-slate-400 text-lg">
            Explore our new arrivals and special deals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="group bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 hover:border-blue-500 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 transform hover:-translate-y-2"
            >
              <div className="relative overflow-hidden">
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>

                {/* خصم لو عندك خاصية discount */}
                {product.discount && (
                  <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm font-bold rounded-full shadow-lg">
                    -{product.discount}%
                  </div>
                )}

                {/* كاتيجوري */}
                {product.category && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-slate-900 bg-opacity-90 text-slate-300 text-xs font-medium rounded-full">
                    {product.category}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <Link to={`/products/${product._id}`}>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {product.name}
                    </h3>
                  </Link>

                  {/* Rating لو عندك rating في الداتا */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating || 0)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-slate-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">
                      ({product.reviews || 0})
                    </span>
                  </div>
                </div>

                {/* السعر */}
                <div className="flex items-baseline space-x-3">
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    ${product.discountPrice || product.price}
                  </span>

                  {product.discountPrice && (
                    <span className="text-lg text-slate-500 line-through">
                      ${product.price}
                    </span>
                  )}
                </div>

                {/* زر إضافة للسلة - معدل */}
                <Link 
                  to={`/products/${product._id}`}
                  className="block w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all transform hover:scale-105 flex items-center justify-center space-x-2 text-center"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>View Details</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductPage;