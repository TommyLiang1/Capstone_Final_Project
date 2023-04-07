const { Router } = require('express');
const { getProfile, editProfile } = require('../controllers/profile');
const { userAuth } = require('../middleware/auth-middleware');
const { profileEditValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middleware/validations-middleware'); 
const router = Router();

router.get('/profile/:id', userAuth, getProfile);
router.put('/editprofile/:id', userAuth, editProfile);

module.exports = router;