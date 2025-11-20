// backend/models/UserModel.js

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true, // يجب أن يكون الإيميل فريداً
        },
        password: {
            type: String,
            required: true,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false, // القيمة الافتراضية هي مستخدم عادي
        },
    },
    {
        timestamps: true, // لإضافة حقلي createdAt و updatedAt
    }
);

// Middleware لتشفير كلمة المرور قبل الحفظ (Pre-save hook)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next(); // لا تشفر إذا لم تتغير كلمة المرور
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// طريقة لمقارنة كلمة المرور المدخلة مع كلمة المرور المشفرة
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;