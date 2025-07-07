const Category = require('../models/Category');

exports.getCategories = async (_, res) => {
    const cats = await Category.find();
    res.json(cats);
};

exports.createCategory = async (req, res) => {
    const cat = await Category.create({ name: req.body.name });
    res.status(201).json(cat);
};



