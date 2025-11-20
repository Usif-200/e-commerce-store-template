// frontend/src/slices/usersApiSlice.js

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// 🌐 يجب الحصول على API_URL بنفس الطريقة التي تستخدمها في ملفاتك الأخرى
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// دالة baseQuery لجلب التوكن من حالة المستخدم
const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().user.userInfo?.token; // جلب التوكن من userSlice
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const usersApiSlice = createApi({
  reducerPath: 'usersApi', // اسم الـ reducer في الـ Store
  baseQuery,
  tagTypes: ['User'], // لتسهيل تحديث الكاش بعد التعديل/الحذف
  endpoints: (builder) => ({
    // 1. جلب جميع المستخدمين (لصفحة الأدمين)
    getUsers: builder.query({
      query: () => '/api/users', // GET /api/users
      providesTags: ['User'],
    }),
    
    // 2. تحديث صلاحيات المستخدم (لصفحة الأدمين)
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/api/users/${data.userId}`, // PUT /api/users/:id
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'], // تحديث القائمة بعد التعديل
    }),
  }),
});

// تصدير الـ Hooks لاستخدامها في المكونات (مثل AdminUserListPage.jsx)
export const { useGetUsersQuery, useUpdateUserMutation } = usersApiSlice;

// ملاحظة: يجب دمج usersApiSlice.reducer في الـ Redux Store الرئيسي.