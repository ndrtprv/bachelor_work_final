const Router = require('express');
const router = new Router();
const userController = require('../controllers/UserController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/signup', userController.registration);
router.post('/login', userController.login);
router.get('/check', authMiddleware, userController.check);

module.exports = router;