// backend/server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path'; 
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js'; 
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'; 

import { notFound, errorHandler } from './middleware/errorMiddleware.js'; 

// تهيئة متغيرات البيئة
dotenv.config();

// الاتصال بقاعدة البيانات
connectDB();

const app = express();

// Middlewares الأساسية
app.use(cors()); 
app.use(express.json()); 

// ----------------------------------------------------
// 1. مسارات الـ API (يجب أن تكون في البداية)
// ----------------------------------------------------
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


// ----------------------------------------------------
// 2. إعدادات الإنتاج (Serving Static Files)
// ----------------------------------------------------

// لتمكين استخدام __dirname في بيئة ES Modules
const __dirname = path.resolve(); 

if (process.env.NODE_ENV === 'production') {
    
    // (A) تحديد مسار مجلد build (ملفات الواجهة الأمامية المجمعة)
    // يُفترض أن مجلد build هو 'dist' لأننا نستخدم Vite
    app.use(express.static(path.join(__dirname, '/frontend/dist'))); 

    // (B) توجيه أي مسار غير API إلى ملف index.html في مجلد dist
    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    );
    
} else {
    // في وضع التطوير (development)
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}

// ----------------------------------------------------
// 3. معالجات الأخطاء (يجب أن تكون في النهاية)
// ----------------------------------------------------
// التعامل مع المسارات غير الموجودة (404)
app.use(notFound);

// معالج الأخطاء العام
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});