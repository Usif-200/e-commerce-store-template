// frontend/src/pages/AdminUserListPage.jsx

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetUsersQuery, useUpdateUserMutation } from '../slices/usersApiSlice'; // <--- يجب إنشاء هذا Slice

const AdminUserListPage = () => {
    // 1. جلب قائمة المستخدمين
    const { data: users, isLoading, error, refetch } = useGetUsersQuery();

    // 2. دالة تحديث صلاحية المستخدم
    const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

    const handleToggleAdmin = async (userId, currentAdminStatus) => {
        try {
            await updateUser({ 
                userId, 
                isAdmin: !currentAdminStatus, // قلب القيمة الحالية (true -> false أو false -> true)
            }).unwrap();
            
            alert(`User role updated successfully!`);
            refetch(); // إعادة جلب القائمة بعد التحديث
        } catch (err) {
            alert(`Error updating user: ${err?.data?.message || err.error}`);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>إدارة المستخدمين</h1>
            
            {isLoading ? (
                <p>جاري التحميل...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>حدث خطأ: {error?.data?.message || error.error}</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ borderBottom: '1px solid #ccc' }}>
                            <th style={{ padding: '10px', textAlign: 'right' }}>الاسم</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>الإيميل</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>الصلاحية</th>
                            <th style={{ padding: '10px', textAlign: 'right' }}>الإجراء</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} style={{ borderBottom: '1px dotted #eee' }}>
                                <td style={{ padding: '10px' }}>{user.name}</td>
                                <td style={{ padding: '10px' }}>{user.email}</td>
                                <td style={{ padding: '10px', color: user.isAdmin ? 'green' : 'gray' }}>
                                    {user.isAdmin ? '✅ مشرف (Admin)' : '👤 مستخدم عادي'}
                                </td>
                                <td style={{ padding: '10px' }}>
                                    <button 
                                        onClick={() => handleToggleAdmin(user._id, user.isAdmin)}
                                        disabled={loadingUpdate}
                                        style={{ 
                                            padding: '5px 10px', 
                                            backgroundColor: user.isAdmin ? '#f44336' : '#4CAF50', 
                                            color: 'white', 
                                            border: 'none', 
                                            cursor: 'pointer' 
                                        }}
                                    >
                                        {user.isAdmin ? 'إزالة صلاحية الأدمين' : 'منح صلاحية الأدمين'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminUserListPage;