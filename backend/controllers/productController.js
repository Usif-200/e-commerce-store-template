// backend/controllers/productController.js

import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel.js';

// @desc    جلب جميع المنتجات
// @route   GET /api/products
// @access  عام (Public)
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    res.json(products);
});

// @desc    جلب منتج واحد بواسطة الـ ID
// @route   GET /api/products/:id
// @access  عام (Public)
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    إنشاء منتج جديد
// @route   POST /api/products
// @access  خاص / الأدمين (Private/Admin)
const createProduct = asyncHandler(async (req, res) => {
    const { name, price, description, imageUrl, category, countInStock } = req.body;

    const product = new Product({
        // user: req.user._id, // يمكن إضافته إذا كنت تريد ربط المنتج بالـ Admin الذي أنشأه
        name,
        price,
        description,
        imageUrl,
        category,
        countInStock,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});


// @desc    تحديث منتج
// @route   PUT /api/products/:id
// @access  خاص/أدمين (Private/Admin)
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, imageUrl, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        // تحديث جميع الحقول بناءً على البيانات المرسلة
        product.name = name || product.name;
        product.price = price || product.price;
        product.description = description || product.description;
        product.imageUrl = imageUrl || product.imageUrl;
        product.category = category || product.category;
        product.countInStock = countInStock || product.countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

// @desc    حذف منتج
// @route   DELETE /api/products/:id
// @access  خاص/أدمين (Private/Admin)
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne(); // استخدام deleteOne() أو remove()
        res.json({ message: 'Product removed' });
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

export { updateProduct, 
    deleteProduct, getProducts, getProductById, createProduct };