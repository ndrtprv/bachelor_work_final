const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');

const generateJwt = (id, login, phone_num, name, surname) => {
    return jwt.sign(
        {id: id, login: login, phone_num: phone_num, name: name, surname: surname},
        process.env.SECRET_KEY,
        {expiresIn: '12h'}
    );
}

class UserController {
    async registration(req, res) {
        const {login, phone_num, password, name, surname, bio, avatar} = req.body;
        const createdAt = new Date();
        if (!login || !phone_num || !password || !name || !surname) {
            return next(ApiError.badRequest("Введено некоректні дані!"));
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
            createdAt: createdAt,
            verifiedAt: null
        });

        const token = generateJwt(newUser.id, newUser.login, newUser.phone_num, newUser.name, newUser.surname);

        return res.json({token});
    }

    async login(req, res) {
        const {login, password} = req.body;

        const user = await User.findOne({where: {login}});
        if (!user) {
            return next(ApiError.badRequest("Користувач не зареєстрований!"));
        }

        let checkPassword = bcrypt.compareSync(password, user.password);
        if (!checkPassword) {
            return next(ApiError.badRequest("Пароль неправильний!"));
        }

        const token = generateJwt(user.id, user.login, user.phone_num, user.name, user.surname);

        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.phone_num, req.user.name, req.user.surname);
        return res.json({token});
    }
}

module.exports = new UserController();