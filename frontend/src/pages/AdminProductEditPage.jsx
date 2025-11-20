// frontend/src/pages/AdminProductEditPage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
// قد تحتاج إلى إضافة هذه الـ Hooks في ملف slices/productApiSlice.js
// import { useGetProductDetailsQuery, useUpdateProductMutation } from '../slices/productsApiSlice'; 

// بما أننا لم نقم بإنشاء الـ slices للـ CRUD الكامل، سنستخدم Axios و Redux Thunk مؤقتاً
const API_URL = import.meta.env.VITE_API_URL;

const AdminProductEditPage = () => {
    const { id: productId } = useParams(); // جلب ID المنتج من الرابط
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);

    // 🌟 حالة النموذج
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [description, setDescription] = useState('');
    const [loadingFetch, setLoadingFetch] = useState(true);
    const [loadingUpdate, setLoadingUpdate] = useState(false);
    const [error, setError] = useState(null);

    // 1. جلب بيانات المنتج عند التحميل
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoadingFetch(true);
                const { data } = await axios.get(`${API_URL}/api/products/${productId}`);
                
                setName(data.name);
                setPrice(data.price);
                setImageUrl(data.imageUrl);
                setCategory(data.category);
                setCountInStock(data.countInStock);
                setDescription(data.description);
                
                setLoadingFetch(false);
            } catch (err) {
                setError(err.response?.data?.message || err.message);
                setLoadingFetch(false);
            }
        };

        fetchProduct();
    }, [productId]);

    // 2. معالج التحديث
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoadingUpdate(true);

        const updatedProduct = {
            name,
            price,
            imageUrl,
            category,
            countInStock,
            description,
        };

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`,
                },
            };

            // إرسال طلب التحديث (PUT) إلى الـ Backend
            await axios.put(`${API_URL}/api/products/${productId}`, updatedProduct, config);

            setLoadingUpdate(false);
            alert('Product updated successfully!');
            navigate('/admin/productlist'); // التوجيه إلى قائمة المنتجات
        } catch (err) {
            setLoadingUpdate(false);
            setError(err.response?.data?.message || err.message);
        }
    };

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <Link to='/admin/productlist' style={{ color: 'blue', marginBottom: '15px', display: 'block' }}>
                &larr; Go Back
            </Link>

            <h1>تعديل المنتج: {name}</h1>
            
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            
            {loadingFetch ? (
                <div>جاري تحميل بيانات المنتج...</div>
            ) : (
                <form onSubmit={submitHandler}>
                    {/* حقل الاسم */}
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="name">الاسم</label>
                        <input type="text" id="name" placeholder="Enter name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>

                    {/* حقل السعر */}
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="price">السعر</label>
                        <input type="number" id="price" placeholder="Enter price" value={price} onChange={(e) => setPrice(Number(e.target.value))} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>
                    
                    {/* حقل الصورة (يمكن تحسينه لاحقاً لرفع الملفات) */}
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="imageUrl">رابط الصورة</label>
                        <input type="text" id="imageUrl" placeholder="Enter image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>
                    
                    {/* حقل الفئة */}
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="category">الفئة</label>
                        <input type="text" id="category" placeholder="Enter category" value={category} onChange={(e) => setCategory(e.target.value)} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>
                    
                    {/* حقل الكمية المتوفرة */}
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="countInStock">الكمية المتوفرة</label>
                        <input type="number" id="countInStock" placeholder="Enter stock count" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>
                    
                    {/* حقل الوصف */}
                    <div style={{ marginBottom: '15px' }}>
                        <label htmlFor="description">الوصف</label>
                        <textarea id="description" placeholder="Enter description" value={description} onChange={(e) => setDescription(e.target.value)} rows="4" required style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }} />
                    </div>

                    <button type="submit" disabled={loadingUpdate} style={{ width: '100%', padding: '10px', background: '#ffc107', color: 'black', border: 'none', cursor: 'pointer' }}>
                        {loadingUpdate ? 'جاري التحديث...' : 'تحديث المنتج'}
                    </button>
                </form>
            )}
        </div>
    );
};

export default AdminProductEditPage;