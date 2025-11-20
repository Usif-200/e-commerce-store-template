// frontend/src/slices/productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// دالة لجلب المنتجات من الـ API (Async Thunk)
export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, { rejectWithValue }) => {
  try {
    // استخدام متغير البيئة الذي أنشأناه
    const API_URL = import.meta.env.VITE_API_URL;
    const { data } = await axios.get(`${API_URL}/api/products`);
    return data;
  } catch (error) {
    // إرجاع رسالة خطأ واضحة
    return rejectWithValue(error.response && error.response.data.message
      ? error.response.data.message
      : error.message);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true; // بدء التحميل
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false; // انتهاء التحميل
        state.items = action.payload; // تخزين البيانات
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // تخزين الخطأ
      });
  },
});

export default productSlice.reducer;