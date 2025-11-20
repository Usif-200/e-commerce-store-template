// backend/controllers/orderController.js

import asyncHandler from 'express-async-handler';
import Order from '../models/OrderModel.js';
import Product from '../models/ProductModel.js'; // نحتاجه للتحقق من الكمية والسعر

// @desc    إنشاء طلب جديد
// @route   POST /api/orders
// @access  خاص (Private)
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            user: req.user._id, // يتم الحصول على الـ ID من الـ protect middleware
            orderItems: orderItems.map((item) => ({
                ...item,
                // نحذف countInStock للحفاظ على النظافة، لأنها فقط للتفقد
                product: item.product, 
                _id: undefined, // لضمان أن كل عنصر جديد لا يستخدم _id وهمي
            })),
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder); // 201 Created
    }
});

// @desc    جلب طلب بواسطة الـ ID
// @route   GET /api/orders/:id
// @access  خاص (Private)
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    ); // جلب اسم وإيميل المستخدم الذي طلب

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    تحديث حالة الدفع للطلب (بعد عملية الدفع الناجحة)
// @route   PUT /api/orders/:id/pay
// @access  خاص (Private)
const updateOrderToPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        // هذه البيانات تأتي من خدمة الدفع (مثل PayPal)
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});


export { addOrderItems, getOrderById, updateOrderToPaid };