const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User, Admin } = require('../models/models');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
import nodemailer from 'nodemailer';

const generateJwt = (id, login, phone_num, name, surname) => {
    return jwt.sign(
        {id: id, login: login, phone_num: phone_num, name: name, surname: surname},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    );
}

class UserController {
    async registration(req, res, next) {
        const { login, phone_num, password, name, surname, bio, avatar, isAdminCandidate, hideData } = req.body;
        try {
            const createdAt = new Date();
            const errors = validationResult(req);

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
                login: login,
                phone_num: phone_num,
                password: encryptedPassword,
                name: name,
                surname: surname,
                bio: bio,
                avatar: avatar,
                hideData: hideData,
                createdAt: createdAt,
                verifiedAt: null
            });

            if (isAdminCandidate) {
                await Admin.create({
                    status: 0,
                    user_id: newUser.id
                });
            }

            const token = generateJwt(newUser.id, newUser.login, newUser.phone_num, newUser.name, newUser.surname);
            res.cookie('token', token, {httpOnly: true, maxAge: 360000});

            return res.json({status: true, message: "Реєстрація успішна!"});
        } catch(e) {
            console.log(e.message);
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

            const token = generateJwt(user.id, user.login, user.phone_num, user.name, user.surname);
            res.cookie('token', token, {httpOnly: true, maxAge: 360000});

            return res.json({status: true, message: "Авторизація успішна!"});
        } catch (e) {
            console.log(e.message);
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

            const token = jwt.sign(
                {id: id, login: login, phone_num: phone_num, name: name, surname: surname},
                process.env.SECRET_KEY,
                {expiresIn: '5m'}
            );

            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'ndrtprvbk@gmail.com',
                    pass: 'tOR1917Len'
                }
            });
              
            var mailOptions = {
                from: 'ndrtprvbk@gmail.com',
                to: login,
                subject: 'Відновлення паролю',
                text: `http://localhost:3000/resetPassword/${token}`
            };
              
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return res.json({message: 'Помилка надсилання листа за вказаним email!'});
                } else {
                    return res.json({status: true, message: 'Лист надіслано за вказаним email: ' + info.response});
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }
}

module.exports = new UserController();