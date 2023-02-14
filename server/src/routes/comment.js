const { Router } = require('express');
const { getComments, getCommentsByPostId, getCommentById, createComment, editComment, addLike, removeLike, deleteComment } = require('../controllers/comment');
const { userAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/comments', userAuth, getComments);
router.get('/comments/:id', userAuth, getCommentsByPostId);
router.get('/comment/:id', userAuth, getCommentById);
router.post('/newcomment/:id', userAuth, createComment);
router.put('/editcomment/:id', userAuth, editComment);
router.put('/addlikecomment/:id', userAuth, addLike);
router.put('/removelikecomment/:id', userAuth, removeLike);
router.delete('/deletecomment/:id', userAuth, deleteComment);

module.exports = router;