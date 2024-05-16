const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController');
const { body } = require('express-validator');

router.post('/signup', body('login').isEmail(), userController.registration);
router.post('/login', body('login').isEmail(), userController.login);
router.post('/forgot-password', body('login').isEmail(), userController.forgotPassword);

module.exports = router;