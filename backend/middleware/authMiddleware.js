// backend/middleware/authMiddleware.js

import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/UserModel.js';

// Middleware للتحقق من أن المستخدم مسجل الدخول
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // التحقق من وجود Token في الـ Header
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // استخراج الـ Token من (Bearer [Token])
            token = req.headers.authorization.split(' ')[1];

            // التحقق من صلاحية الـ Token (Verify)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // جلب بيانات المستخدم من قاعدة البيانات وإضافتها للطلب (Req)
            req.user = await User.findById(decoded.id).select('-password');

            next(); // الاستمرار للمتحكم التالي
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Middleware للتحقق من أن المستخدم هو Admin
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin };