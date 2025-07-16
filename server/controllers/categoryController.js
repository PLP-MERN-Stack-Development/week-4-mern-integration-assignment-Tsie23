const Category = require('../models/Category');
const { body, validationResult } = require('express-validator');

exports.getCategories = async (_, res) => {
    const cats = await Category.find();
    res.json(cats);
};

exports.createCategory = [
    body('name').notEmpty().withMessage('Name is required'),
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        try {
            const cat = await Category.create({ name: req.body.name });
            res.status(201).json(cat);
        } catch (err) { next(err); }
    }
];



