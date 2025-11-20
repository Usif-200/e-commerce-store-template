// backend/routes/orderRoutes.js

import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    updateOrderToPaid
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; // الطلبات خاصة بالمستخدم المسجل

// المسار الجذري للطلبات: إنشاء طلب جديد
router.route('/').post(protect, addOrderItems); 

// مسار الطلب الواحد: جلب وتحديث حالة الدفع
router.route('/:id').get(protect, getOrderById); 
router.route('/:id/pay').put(protect, updateOrderToPaid); 

export default router;