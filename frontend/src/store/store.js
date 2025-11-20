// frontend/src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
// استيراد الـ Slices العادية
import userReducer from '../slices/userSlice';
import cartReducer from '../slices/cartSlice';
import productReducer from '../slices/productSlice'; // جلب المنتجات 

// 🌟 استيراد RTK Query API Slices 🌟
// يجب أن تكون قد أنشأت هذا الملف كما وضحنا سابقاً
import { usersApiSlice } from '../slices/usersApiSlice'; 
// يمكنك أيضاً إنشاء slices مماثلة للمنتجات والطلبات لاحقاً
// import { productsApiSlice } from '../slices/productsApiSlice'; 


const store = configureStore({
  reducer: {
    // 1. Reducers العادية (Non-RTK Query)
    user: userReducer,
    cart: cartReducer,
    product: productReducer,
    
    // 2. دمج RTK Query Reducers
    // [usersApiSlice.reducerPath] تُنشئ خاصية ديناميكية باسم 'usersApi' في الـ state
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
    // [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  
  // 3. إضافة Middleware الخاص بـ RTK Query
  // Middleware ضروري لتمكين وظائف caching, invalidation, polling لـ RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(usersApiSlice.middleware),
    // .concat(productsApiSlice.middleware) 
    
  devTools: true, // لتسهيل تتبع الـ state في المتصفح
});

export default store;