// frontend/src/pages/AdminProductCreatePage.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const AdminProductCreatePage = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);

    // التحقق من صلاحيات الأدمين وتوجيهه إذا لم يكن أدمين
    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            navigate('/login');
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`, // إرسال JWT
                },
            };

            await axios.post(
                `${API_URL}/api/products`,
                { name, price, imageUrl, description, category, countInStock },
                config
            );

            setLoading(false);
            setSuccess(true);
            
            // إعادة تعيين النموذج بعد النجاح
            setName(''); setPrice(0); setImageUrl(''); setDescription(''); setCountInStock(0); setCategory('');
            
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || err.message);
        }
    };

    if (!userInfo || !userInfo.isAdmin) return <h1 style={{ textAlign: 'center' }}>Access Denied</h1>;

    return (
        <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
            <h1>Admin: Create Product</h1>
            {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px' }}>Product created successfully!</div>}
            {loading && <div>Loading...</div>}

            <form onSubmit={submitHandler}>
                {/* حقول الإدخال: الاسم، السعر، الصورة، الوصف، التصنيف، الكمية */}
                {['name', 'price', 'imageUrl', 'description', 'category', 'countInStock'].map((field) => (
                    <div key={field} style={{ marginBottom: '15px' }}>
                        <label htmlFor={field} style={{ display: 'block', textTransform: 'capitalize' }}>{field.replace(/([A-Z])/g, ' $1')}</label>
                        <input
                            type={['price', 'countInStock'].includes(field) ? 'number' : 'text'}
                            id={field}
                            value={eval(field)} // استخدام eval للوصول للقيمة حسب الاسم (ليس الأفضل لكن سريع)
                            onChange={(e) => eval(`set${field.charAt(0).toUpperCase() + field.slice(1)}`)(e.target.value)}
                            required
                            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
                        />
                    </div>
                ))}
                
                <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', background: '#343a40', color: 'white', border: 'none', cursor: 'pointer' }}>
                    Create Product
                </button>
            </form>
        </div>
    );
};

export default AdminProductCreatePage;