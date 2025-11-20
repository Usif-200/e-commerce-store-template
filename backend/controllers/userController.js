// backend/controllers/userController.js

import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/UserModel.js';

// @desc    مصادقة المستخدم والحصول على Token
// @route   POST /api/users/login
// @access  عام (Public)
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id), // إنشاء JWT
        });
    } else {
        res.status(401); // غير مصرح له
        throw new Error('Invalid email or password');
    }
});

// @desc    تسجيل مستخدم جديد
// @route   POST /api/users
// @access  عام (Public)
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400); // طلب سيء
        throw new Error('User already exists');
    }

    const user = await User.create({
        name,
        email,
        password, // سيتم تشفيره بواسطة middleware في UserModel
    });

    if (user) {
        res.status(201).json({ // 201: Created
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    جلب جميع المستخدمين
// @route   GET /api/users
// @access  خاص/أدمين (Private/Admin)
const getUsers = asyncHandler(async (req, res) => {
    // ببساطة، نجلب جميع المستخدمين من قاعدة البيانات
    const users = await User.find({});
    res.json(users);
});

// @desc    تحديث بيانات مستخدم بواسطة الأدمين
// @route   PUT /api/users/:id
// @access  خاص/أدمين (Private/Admin)
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        
        // 🚨 المنطق الأساسي: تحديث صلاحية الأدمين
        // إذا أرسل الأدمين قيمة لـ isAdmin، نقوم بتحديثها.
        if (req.body.isAdmin !== undefined) {
            user.isAdmin = req.body.isAdmin;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});



export { authUser,
        getUsers, 
        updateUser,
        registerUser };