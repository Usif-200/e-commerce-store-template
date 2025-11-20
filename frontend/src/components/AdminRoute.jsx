// frontend/src/components/AdminRoute.jsx

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
  const { userInfo } = useSelector((state) => state.user);
  
  // إذا كان المستخدم مسجل الدخول وهو أدمين، فسنعرض المكون المطلوب (Outlet)
  // وإلا فسنقوم بتوجيهه إلى صفحة تسجيل الدخول
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AdminRoute;