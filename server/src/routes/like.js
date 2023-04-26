const { Router } = require('express');
const { getLikesToPosts, addUserLikeToPost, removeUserLikeToPost, getLikesToComments, addUserLikeToComment, removeUserLikeToComment } = require('../controllers/like');
const { userAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/likeposts/:id', userAuth, getLikesToPosts);
router.post('/likepost', userAuth, addUserLikeToPost);
router.delete('/unlikepost/:id', userAuth, removeUserLikeToPost);

router.get('/likecomments/:id', userAuth, getLikesToComments);
router.post('/likecomment', userAuth, addUserLikeToComment);
router.delete('/unlikecomment/:id', userAuth, removeUserLikeToComment);

module.exports = router;