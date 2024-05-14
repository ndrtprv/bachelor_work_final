const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User, Admin } = require('../models/models');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateJwt = (id, login, phone_num, name, surname) => {
    return jwt.sign(
        {id: id, login: login, phone_num: phone_num, name: name, surname: surname},
        process.env.SECRET_KEY,
        {expiresIn: '1h'}
    );
}

class UserController {
    async registration(req, res, next) {
        const {login, phone_num, password, name, surname, bio, avatar, isAdminCandidate, hideData } = req.body;
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
    }

    async login(req, res, next) {
        const {login, password} = req.body;
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
    }
}

module.exports = new UserController();