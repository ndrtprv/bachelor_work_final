const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User, Admin, Avatars } = require('../models/models');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const generateAccessJwt = (login, phone_num, name, surname) => {
    return jwt.sign(
        {login: login, phone_num: phone_num, name: name, surname: surname},
        process.env.SECRET_ACCESS_KEY,
        {expiresIn: '15m'}
    );
}

const generateRefreshJwt = (login, phone_num, name, surname) => {
    return jwt.sign(
        {login: login, phone_num: phone_num, name: name, surname: surname},
        process.env.SECRET_REFRESH_KEY,
        {expiresIn: '8h'}
    );
}

const generateJwtForMail = (login, phone_num, name, surname) => {
    return jwt.sign(
        {login: login, phone_num: phone_num, name: name, surname: surname},
        process.env.SECRET_ACCESS_KEY,
        {expiresIn: '15m'}
    );
}

class UserController {
    async registration(req, res, next) {
        console.log('Request received:', req.body, req.file); 

        const { login, phone_num, password, name, surname, bio, isAdminCandidate, hideData } = req.body;

        try {
            const createdAt = new Date();
            const errors = validationResult(req.body);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Невалідний email!"));
            }

            if (!login || !phone_num || !password || !name || !surname) {
                return next(ApiError.badRequest("Не введено дані!"));
            }

            const candidate = await User.findOne({where: {login}});
            if (candidate) {
                return next(ApiError.badRequest("Користувач уже існує в системі!"));
            }

            const encryptedPassword = await bcrypt.hash(password, 7);
            
            const newUser = await User.create({
                login,
                phone_num,
                password: encryptedPassword,
                name,
                surname,
                bio,
                hideData,
                createdAt,
                verifiedAt: null
            });

            if (req.file !== undefined) {
                await Avatars.create({
                    data: req.file.buffer,
                    contentType: req.file.mimetype,
                    user_id: newUser.id
                });
            }

            if (isAdminCandidate) {
                await Admin.create({
                    status: 0,
                    user_id: newUser.id
                });
            }

            const accessToken = generateAccessJwt(newUser.login, newUser.phone_num, newUser.name, newUser.surname);
            const refreshToken = generateRefreshJwt(newUser.login, newUser.phone_num, newUser.name, newUser.surname);

            res.cookie('accessToken', accessToken, {maxAge: 900000});
            res.cookie('refreshToken', refreshToken, {maxAge: 3600000 * 8, httpOnly: true, secure: true, sameSite: 'strict'});

            const mailToken = generateJwtForMail(newUser.login, newUser.phone_num, newUser.name, newUser.surname);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ORIGIN_EMAIL,
                    pass: process.env.ORIGIN_PASSWORD
                }
            });

            const encodedToken = encodeURIComponent(mailToken).replace(/\./g, "%2E");
            const link = `http://localhost:3000/confirm/${encodedToken}`;

            var mailOptions = {
                from: process.env.ORIGIN_EMAIL,
                to: login,
                subject: 'Підтвердження даних',
                html: `<div>
                            <p>Вам надіслано повідомлення на підтвердження даних. Якщо це були не ви, повідомте нам: ми видалимо користувача.</p>
                            <a href=${link} class="btn btn-primary">Підтвердити дані</a>
                        </div>`
            };

            await transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({message: 'Помилка надсилання листа за вказаним email!'});
                }
            });

            return res.json({status: true, message: "Реєстрація успішна!"});
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async resend(req, res, next) {
        const token = req.cookies.token;
        console.log(token);

        try {
            /*const decoded = jwt.verify(token, process.env.SECRET_KEY);
            console.log(decoded);

            const user = await User.findOne({where: {id: decoded.id}});

            const mailToken = generateJwtForMail(user.login, user.phone_num, user.name, user.surname);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ORIGIN_EMAIL,
                    pass: process.env.ORIGIN_PASSWORD
                }
            });

            const encodedToken = encodeURIComponent(mailToken).replace(/\./g, "%2E");
            const link = `http://localhost:3000/confirm/${encodedToken}`;

            var mailOptions = {
                from: process.env.ORIGIN_EMAIL,
                to: login,
                subject: 'Підтвердження даних',
                html: `<div>
                            <p>Вам надіслано повідомлення на підтвердження даних. Якщо це були не ви, повідомте нам: ми видалимо користувача.</p>
                            <a href=${link} class="btn btn-primary">Підтвердити дані</a>
                        </div>`
            };

            await transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({message: 'Помилка надсилання листа за вказаним email!'});
                } else {
                    return res.json({status: true, message: 'Лист надіслано за вказаним email: ' + info.response});
                }
            });*/
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async confirm(req, res, next) {
        const {token} = req.params;

        try {
            const decoded = jwt.verify(token, process.env.SECRET_KEY);

            await User.update({verifiedAt: new Date()}, {where: {login: decoded.login}});
            return res.json({status: true, message: 'Користувача підтверджено! Вітаю!'});
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async login(req, res, next) {
        const { login, password } = req.body;
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Невалідний email!"));
            }

            const user = await User.findOne({where: {login}});
            if (!user) {
                return next(ApiError.badRequest("Користувач не зареєстрований!"));
            }

            let checkPassword = bcrypt.compareSync(password, user.password);
            if (!checkPassword) {
                return next(ApiError.badRequest("Пароль неправильний!"));
            }

            const accessToken = generateAccessJwt(user.login, user.phone_num, user.name, user.surname);
            const refreshToken = generateRefreshJwt(user.login, user.phone_num, user.name, user.surname);

            res.cookie('accessToken', accessToken, {maxAge: 900000});
            res.cookie('refreshToken', refreshToken, {maxAge: 3600000 * 8, httpOnly: true, secure: true, sameSite: 'strict'});

            return res.json({status: true, message: "Авторизація успішна!"});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async forgotPassword(req, res, next) {
        const {login} = req.body;

        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return next(ApiError.badRequest("Невалідний email!"));
            }

            const user = await User.findOne({where: {login}});
            if (!user) {
                return next(ApiError.badRequest("Користувач не зареєстрований!"));
            }

            const token = generateJwtForMail(user.login, user.phone_num, user.name, user.surname);

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.ORIGIN_EMAIL,
                    pass: process.env.ORIGIN_PASSWORD
                }
            });

            const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
            const link = `http://localhost:3000/resetPassword/${encodedToken}`;

            var mailOptions = {
                from: process.env.ORIGIN_EMAIL,
                to: login,
                subject: 'Відновлення паролю',
                html: `<div>
                            <p>Вам надіслано повідомлення на скидання паролю. Якщо це були не ви, проігноруйте повідомлення.</p>
                            <a href=${link} class="btn btn-primary">Скинути пароль</a>
                        </div>`
            };
              
            await transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({message: 'Помилка надсилання листа за вказаним email!'});
                } else {
                    return res.json({status: true, message: 'Лист надіслано за вказаним email: ' + info.response});
                }
            });
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async resetPassword(req, res, next) {
        const {token} = req.params;
        const {password} = req.body;

        try {
            const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
            const encryptedPassword = await bcrypt.hash(password, 7);

            await User.update({password: encryptedPassword}, {where: {id: decoded.id}});

            return res.json({status: true, message: 'Пароль оновлено!'});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getNavigation(req, res) {
        try {
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
                        }
                    });
                }
            }

            const decoded = await jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

            const user = await User.findOne({where: {login: decoded.login}});
            const possibleAvatar = await Avatars.findOne({where: {user_id: user.id}});
            const possibleAdmin = await Admin.findOne({where: {user_id: user.id, status: 1}});

            let photo;
            if (possibleAvatar) {
                photo = {
                    data: possibleAvatar.data.toString("base64"),
                    contentType: possibleAvatar.contentType
                };
            } else {
                photo = null;
            }

            if (possibleAdmin) {
                return res.json({status: true, isAdmin: true, portrait: photo, message: 'Ви авторизовані! Ви адмін.'});
            } else {
                return res.json({status: true, isAdmin: false, portrait: photo, message: 'Ви авторизовані!'});
            }
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getProfile(req, res) {
        try {
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
                        }
                    });
                }
            }

            const decoded = await jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);

            const user = await User.findOne({where: {login: decoded.login}});
            const possibleAvatar = await Avatars.findOne({where: {user_id: user.id}});

            let photo;
            if (possibleAvatar) {
                photo = {
                    data: possibleAvatar.data.toString("base64"),
                    contentType: possibleAvatar.contentType
                };
            } else {
                photo = null;
            }

            return res.json({status: true, user, portrait: photo, message: 'Ви авторизовані!'});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie('accessToken');
            res.clearCookie('refreshToken');
            return res.json({status: true, message: 'Вихід успішний!'});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new UserController();