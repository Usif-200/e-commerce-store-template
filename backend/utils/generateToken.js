// backend/utils/generateToken.js

import jwt from 'jsonwebtoken';

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // صلاحية الـ Token لمدة 30 يوماً
    });
};

export default generateToken;