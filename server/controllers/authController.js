const jwt = require('jsonwebtoken');
const User = require('../models/User');

const genToken = id => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1d' });

exports.register = async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    res.status(201).json({ user, token: genToken(user._id) });
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.matchPassword(password)) {
        res.json({ user, token: genToken(user._id) });
    } else {
        res.status(401).json({ message: 'Invalid credentials'});
    }
};

