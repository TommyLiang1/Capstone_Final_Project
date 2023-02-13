const { Router } = require('express');
const { getUsers, register, login, protected, logout } = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middleware/validations-middleware'); 
const { userAuth } = require('../middleware/auth-middleware');
const router = Router();

router.get('/get-users', getUsers);
router.get('/protected', userAuth, protected);
router.get('/logout', logout);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);

module.exports = router;