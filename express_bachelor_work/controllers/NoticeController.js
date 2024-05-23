const ApiError = require("../error/ApiError");
const jwt = require('jsonwebtoken');
const { Notice, Photo, User } = require("../models/models");

class NoticeController {

    async addNotice(req, res, next) {
        const { type, kind, description } = req.body;
        const file = req.file;
        const accessToken = req.cookies.accessToken;

        try {
            const createdAt = new Date();
            
            if (!type || !kind || !description) {
                return next(ApiError.badRequest("Не введено дані!"));
            }

            let chosenType = 0
            if (type === "Допомога ЗСУ") {
                chosenType = 0;
            } else {
                chosenType = 1;
            }

            const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
            const user = await User.findOne({where: {login: decoded.login}});

            const newNotice = await Notice.create({ type: chosenType, kind, description, createdAt, user_id: user.id });

            await Photo.create({
                src_photo: file.buffer,
                contentType: file.mimetype,
                notice_id: newNotice.id,
                fundraise_id: null,
                result_id: null
            });

            return res.json({status: true, message: "Оголошення додане." })
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateNotice(req, res) {

    }

    async deleteNotice(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getNotices(req, res, next) {
        try {
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUsersNotices(req, res, next) {
        const accessToken = req.cookies.accessToken;

        try {

            const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
            const user = await User.findOne({where: {login: decoded.login}});

            const allNotices = await Notice.findAll({where: {user_id: user.id}});
            
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getNotice(req, res) {

    }
}

module.exports = new NoticeController();