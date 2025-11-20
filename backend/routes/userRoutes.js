// backend/routes/userRoutes.js

import express from 'express';
const router = express.Router();
import { 
    authUser, 
    registerUser, 
    getUsers, // <--- الدالة الجديدة
    updateUser // <--- الدالة الجديدة
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// المسار الجذري '/api/users'
router.route('/')
    .post(registerUser)  // POST /api/users (تسجيل جديد)
    .get(protect, admin, getUsers); // GET /api/users (جلب الجميع - للأدمين فقط)

// مسار التحديث والتفاصيل للمستخدم الواحد '/api/users/:id'
router.route('/:id')
    .put(protect, admin, updateUser); // PUT /api/users/:id (تحديث - للأدمين فقط)

router.post('/login', authUser); // مسار الدخول

export default router;