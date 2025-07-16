const router = require('express').Router();
const { getPosts, getPost, createPost, updatePost, deletePost, addComment, getComments, searchPosts } = require('../controllers/postController');
const { protect } = require('../middleware/auth');

router.get('/', getPosts);
router.get('/search', searchPosts);
router.get('/:id', getPost);
router.post('/', protect, createPost);
router.put('/:id', protect, updatePost);
router.delete('/:id', protect, deletePost);
router.get('/:id/comments', getComments);
router.post('/:id/comments', protect, addComment);

module.exports = router;