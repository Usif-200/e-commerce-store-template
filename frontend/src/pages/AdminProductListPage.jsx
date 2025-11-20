// frontend/src/pages/AdminProductListPage.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../slices/productSlice'; // سنعيد استخدام دالة الجلب

// نفترض أنك ستضيف دوال حذف وتحديث في الـ Redux
// import { useDeleteProductMutation } from '../slices/productsApiSlice'; 
import axios from 'axios'; 
const API_URL = import.meta.env.VITE_API_URL;

const AdminProductListPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // جلب المنتجات من Redux State
    const { items: products, loading, error } = useSelector((state) => state.product);
    const { userInfo } = useSelector((state) => state.user);

    // ملاحظة: لتبسيط الكود، سنستخدم هنا axios مباشرة للحذف
    const deleteHandler = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                };
                await axios.delete(`${API_URL}/api/products/${id}`, config);
                dispatch(fetchProducts()); // إعادة جلب المنتجات بعد الحذف
            } catch (err) {
                alert(`Error deleting product: ${err.response?.data?.message || err.message}`);
            }
        }
    };

    // تأكد من جلب المنتجات عند تحميل الصفحة
    React.useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    return (
        <div style={{ padding: '20px' }}>
            <h1>إدارة المنتجات</h1>
            <Link to="/admin/product/create" style={{ display: 'inline-block', marginBottom: '20px', padding: '10px', background: '#007bff', color: 'white', textDecoration: 'none' }}>
                + إضافة منتج جديد
            </Link>

            {loading ? (
                <p>جاري التحميل...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>حدث خطأ: {error}</p>
            ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'right' }}>
                    <thead>
                        <tr style={{ borderBottom: '2px solid #333' }}>
                            <th style={{ padding: '10px' }}>ID</th>
                            <th style={{ padding: '10px' }}>الاسم</th>
                            <th style={{ padding: '10px' }}>السعر</th>
                            <th style={{ padding: '10px' }}>الإجراءات</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product._id} style={{ borderBottom: '1px dotted #ccc' }}>
                                <td style={{ padding: '10px' }}>{product._id}</td>
                                <td style={{ padding: '10px' }}>{product.name}</td>
                                <td style={{ padding: '10px' }}>${product.price}</td>
                                <td style={{ padding: '10px' }}>
                                    <Link to={`/admin/product/${product._id}/edit`} style={{ marginRight: '10px', color: 'blue' }}>
                                        تعديل
                                    </Link>
                                    <button 
                                        onClick={() => deleteHandler(product._id)}
                                        style={{ background: 'red', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
                                    >
                                        حذف
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

export default AdminProductListPage;