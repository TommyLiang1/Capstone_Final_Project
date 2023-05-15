const { Router } = require('express');
const { getUsers, getUserById, getUserByEmail, register, login, googleLogin, protected, logout } = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middleware/validations-middleware'); 
const { userAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/users', getUsers);
router.get('/user/:id', getUserById);
router.get('/user', getUserByEmail);
router.get('/protected', userAuth, protected);
router.get('/logout', logout);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
// router.post('/google/login', googleLogin);

module.exports = router;