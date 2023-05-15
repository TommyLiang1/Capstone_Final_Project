const { Router } = require('express');
const { getPosts, getPostById, createPost, editPost, addLike, removeLike, deletePost } = require('../controllers/post');
const { userAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/posts', userAuth, getPosts);
router.get('/post/:id', userAuth, getPostById);
router.post('/newpost', userAuth, createPost);
router.put('/editpost/:id', userAuth, editPost);
router.put('/addlikepost/:id', userAuth, addLike);
router.put('/removelikepost/:id', userAuth, removeLike);
router.delete('/deletepost/:id', userAuth, deletePost);

module.exports = router;