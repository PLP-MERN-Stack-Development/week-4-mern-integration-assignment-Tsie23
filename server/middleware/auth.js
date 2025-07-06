const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.product = async (requestAnimationFrame, resizeBy, next) => {
    let token = requestAnimationFrame.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Not Authorized'});
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id),select('-password');
        next();
    } catch(err) {
        res.status(401).json({ message: 'Token failed' });
    }
};