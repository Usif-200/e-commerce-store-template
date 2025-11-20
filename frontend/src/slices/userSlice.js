// frontend/src/slices/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 🌐 متغير البيئة لعنوان الـ API
const API_URL = import.meta.env.VITE_API_URL;

// 💾 محاولة جلب بيانات المستخدم من LocalStorage عند تحميل التطبيق
const userFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;

// ===================================
// 1. ASYNC THUNKS (للتفاعل مع الـ API)
// ===================================

// Thunk لتسجيل الدخول
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(
        `${API_URL}/api/users/login`,
        { email, password },
        config
      );
      // تخزين بيانات المستخدم (بما في ذلك Token) في LocalStorage
      localStorage.setItem('userInfo', JSON.stringify(data)); 
      return data;
    } catch (error) {
      // إرجاع رسالة خطأ السيرفر
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk لتسجيل مستخدم جديد
export const register = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = { headers: { 'Content-Type': 'application/json' } };
      const { data } = await axios.post(
        `${API_URL}/api/users`, // مسار التسجيل هو نفسه مسار POST /api/users
        { name, email, password },
        config
      );
      // تخزين بيانات المستخدم (بما في ذلك Token) في LocalStorage
      localStorage.setItem('userInfo', JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Thunk لتسجيل الخروج
export const logout = createAsyncThunk('user/logout', async () => {
    // حذف بيانات المستخدم من LocalStorage
    localStorage.removeItem('userInfo');
    return null; // سيتم تعيين userInfo إلى null في حالة fulfilled
});


// ===================================
// 2. CREATE SLICE (لتكوين الـ Reducer)
// ===================================

const userSlice = createSlice({
  name: 'user', // 🚨 هذه الخاصية كانت مفقودة وتسببت في الخطأ السابق
  initialState: {
    userInfo: userFromStorage,
    loading: false,
    error: null,
  },
  reducers: {
    // يمكن إضافة reducers متزامنة هنا إذا لزم الأمر
  },
  extraReducers: (builder) => {
    builder
      // ---------------- حالات LOGIN ----------------
      .addCase(login.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(login.fulfilled, (state, action) => { state.loading = false; state.userInfo = action.payload; })
      .addCase(login.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      
      // ---------------- حالات REGISTER ----------------
      .addCase(register.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(register.fulfilled, (state, action) => { state.loading = false; state.userInfo = action.payload; })
      .addCase(register.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      // ---------------- حالات LOGOUT ----------------
      .addCase(logout.fulfilled, (state) => { 
        state.userInfo = null; 
        state.loading = false; 
        state.error = null; 
      });
  },
});

export default userSlice.reducer;