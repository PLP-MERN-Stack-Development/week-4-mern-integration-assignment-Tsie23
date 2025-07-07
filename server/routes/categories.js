const router = require('express').Router();
const { getCategories, createCategory } = require('../controllers/categoryController');
const { protect } = require('../middleware/auth');

router.get('/', getCategories);
router.post('/', protect, createCategory);

module.exports = router;