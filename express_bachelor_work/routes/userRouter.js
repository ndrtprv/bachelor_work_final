const Router = require('express');
const multer = require('multer');
const router = new Router();
const userController = require('../controllers/UserController');
const { body } = require('express-validator');
const jwt = require('jsonwebtoken');

const storage = multer.memoryStorage();

const upload = multer({ storage: storage });

const generateAccessJwt = (login, phone_num, name, surname) => {
    return jwt.sign(
        {login: login, phone_num: phone_num, name: name, surname: surname},
        process.env.SECRET_ACCESS_KEY,
        {expiresIn: '15m'}
    );
}

const verifyUser = async (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;
    if (!accessToken) {
        if (!refreshToken) {
            return res.json({status: false, message: 'Ви не авторизовані!'});
        } else {
            await jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY, (err, decoded) => {
                if (err) {
                    return res.json({status: false, message: 'Невалідний токен оновлення!'});
                } else {
                    const accessToken = generateAccessJwt(decoded.login, decoded.phone_num, decoded.name, decoded.surname);
                    res.cookie('accessToken', accessToken, {maxAge: 900000});
                    req.login = decoded.login;
                    next();
                }
            });
        }
    } else {
        await jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY, (err, decoded) => {
            if (err) {
                return res.json({status: false, message: 'Невалідний токен доступу!'});
            } else {
                req.login = decoded.login;
                next();
            }
        });
    }
}

router.post('/signup', body('login').isEmail(), upload.single('avatar'), userController.registration);
router.post('/resend', userController.resend);
router.post('/login', body('login').isEmail(), userController.login);
router.post('/forgot-password', body('login').isEmail(), userController.forgotPassword);
router.post('/reset-password/:token', userController.resetPassword);
router.post('/confirm/:token', userController.confirm);
router.post('/updateData', verifyUser, userController.updateData)
router.get('/nav', verifyUser, userController.getNavigation)
router.get('/profile', verifyUser, userController.getProfile);
router.get('/logout', userController.logout);

module.exports = router;