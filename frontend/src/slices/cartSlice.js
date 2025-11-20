// frontend/src/slices/cartSlice.js

import { createSlice } from '@reduxjs/toolkit';

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) 
    : [];

// 🌟 جلب بيانات الشحن والدفع من LocalStorage 🌟
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {};

// 🚨 تصحيح: يجب استخدام JSON.parse هنا أيضاً إذا كانت القيمة المخزنة نصية، 
// أو التأكد من أن القيمة المخزنة هي نص عادي. سنفترض أنها نص عادي هنا.
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
    ? localStorage.getItem('paymentMethod') 
    : '';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
    paymentMethod: paymentMethodFromStorage,
    // يجب أيضاً إضافة حقول الأسعار للمراجعة في حالة الحاجة
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
  reducers: {
    addToCart: (state, action) => {
        const item = action.payload;
        const existItem = state.cartItems.find((x) => x.product === item.product);

        if (existItem) {
            state.cartItems = state.cartItems.map((x) =>
                x.product === existItem.product ? item : x
            );
        } else {
            state.cartItems.push(item);
        }
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
        state.cartItems = state.cartItems.filter((x) => x.product !== action.payload);
        localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    
    // 🌟 Reducers الجديدة التي كانت مفقودة 🌟
    
    // لحفظ بيانات الشحن
    saveShippingAddress: (state, action) => {
        state.shippingAddress = action.payload;
        localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    
    // لحفظ طريقة الدفع
    savePaymentMethod: (state, action) => {
        state.paymentMethod = action.payload;
        localStorage.setItem('paymentMethod', action.payload); // حفظها كنص عادي
    },
    
    // لمسح السلة بعد إنشاء الطلب بنجاح
    clearCartItems: (state) => { 
        state.cartItems = [];
        localStorage.removeItem('cartItems');
    }
  },
});

export const { 
    addToCart, 
    removeFromCart, 
    saveShippingAddress, // 👈 الآن تم تعريفها وتصديرها بشكل صحيح
    savePaymentMethod, 
    clearCartItems 
} = cartSlice.actions;

export default cartSlice.reducer;