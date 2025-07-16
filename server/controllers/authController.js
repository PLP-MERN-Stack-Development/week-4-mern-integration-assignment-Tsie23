const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

const genToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const { name, email, password } = req.body;
            const user = await User.create({ name, email, password });
            res.status(201).json({ user, token: genToken(user._id) });
        } catch (err) { next(err); }
    }
];

exports.login = [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (user && await user.matchPassword(password)) {
                res.json({ user, token: genToken(user._id) });
            } else {
                res.status(401).json({ message: 'Invalid credentials'});
            }
        } catch (err) { next(err); }
    }
];

