const Router = require('express');
const multer = require('multer');
const path = require('path');
const router = new Router();
const userController = require('../controllers/UserController');
const { body } = require('express-validator');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

router.post('/signup', body('login').isEmail(), upload.single('avatar'), userController.registration);
router.post('/resend', userController.resend);
router.post('/login', body('login').isEmail(), userController.login);
router.post('/forgot-password', body('login').isEmail(), userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.get('/confirm/:token', userController.confirm);
router.get('/nav', userController.getNavigation)
router.get('/profile', userController.getProfile);
router.get('/logout', userController.logout);

module.exports = router;