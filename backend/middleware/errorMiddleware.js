// backend/middleware/errorMiddleware.js

// Middleware للتعامل مع المسارات غير الموجودة (404)
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // تمرير الخطأ إلى error handler التالي
};

// Middleware للتعامل مع جميع الأخطاء الأخرى (500)
const errorHandler = (err, req, res, next) => {
    // تحديد رمز الحالة. إذا كان الكود 200 (Success)، فسنغيره إلى 500 (Server Error)
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);

    res.json({
        message: err.message,
        // عرض الـ Stack Trace فقط في وضع التطوير (development)
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };