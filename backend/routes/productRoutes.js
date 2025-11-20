// backend/routes/productRoutes.js

import express from 'express';
const router = express.Router();
import {
    getProducts,
    getProductById,
    updateProduct, // <--- الدالة الجديدة
    deleteProduct, // <--- الدالة الجديدة
    createProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/')
    .get(getProducts) // عام (Public) - جلب جميع المنتجات
    .post(protect, admin, createProduct); // خاص (Private) / للأدمين فقط - إضافة منتج

router.route('/:id')
    .get(getProductById) // جلب منتج واحد (عام)
    .put(protect, admin, updateProduct) // تحديث (أدمين فقط)
    .delete(protect, admin, deleteProduct); // حذف (أدمين فقط)

export default router;