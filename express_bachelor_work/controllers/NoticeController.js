const ApiError = require("../error/ApiError");
const jwt = require('jsonwebtoken');
const { Notice, Photo, User } = require("../models/models");

function cipherData(data, type) {
    if (!data) return data;

    switch(type) {
        case 'login':
            const [localPart, domain] = data.split('@');
            return localPart[0] + '*'.repeat(localPart.length - 1) + '@' + domain;
        case 'phone_num':
            return data[0] + data[1] + '*'.repeat(data.length - 3) + data.slice(-2);
        case 'name':
        case 'surname':
            return data[0] + '*'.repeat(data.length - 1);
        default:
            return data;
    }
}

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

        const {id} = req.body;

        try {
            const notice = await Notice.findOne({where: {id: id}});

            if (notice) {
                await Notice.destroy({where: {id: id}});

                return res.json({status: true, message: 'Видалення оголошення успішне!'});
            } else {
                return res.json({status: false, message: 'Оголошення не знайдено!'});
            }

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getNotices(req, res, next) {
        
        const {activePage} = req.body;

        console.log("Active page: " + JSON.stringify(req.activePage))
        let limit = 5;
        let currentPage = activePage || 1;

        let offset = limit * currentPage - limit;

        try {
            
            const count = await Notice.count();

            if (count === 0) {
                return res.json({message: "It's empty!"});
            }

            let pages = Math.ceil(count / limit);

            const notices = await Notice.findAll({
                include: [
                    {
                        model: Photo,
                        as: 'photos',
                        attributes: ['photo_id', 'src_photo', 'contentType']
                    },
                    {
                        model: User,
                        attributes: ['id', 'login', 'phone_num', 'name', 'surname', 'hideData']
                    }
                ],
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });

            const noticesProcessed = notices.map(notice => {
                const photosWithBase64 = notice.photos.map(photo => {
                    return {
                        photo_id: photo.photo_id,
                        src_photo: photo.src_photo.toString('base64'), // Convert bytea to base64
                        contentType: photo.contentType
                    };
                });
    
                // Cipher user data if hideData is true
                let user = notice.user;
                if (user.hideData) {
                    user.login = cipherData(user.login, 'login');
                    user.phone_num = cipherData(user.phone_num, 'phone_num');
                    user.name = cipherData(user.name, 'name');
                    user.surname = cipherData(user.surname, 'surname');
                }

                return {
                    ...notice.toJSON(),
                    typeDescription: notice.type === 0 ? "Допомога ЗСУ" : "Гуманітарна допомога",
                    photos: photosWithBase64,
                    user: user
                };
            });
            
            return res.json({noticesProcessed, pages, message: "OK"});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getUsersNotices(req, res, next) {
        const {activePage} = req.body;
        const accessToken = req.cookies.accessToken;

        console.log("Active page: " + JSON.stringify(req.activePage))
        let limit = 5;
        let currentPage = activePage || 1;

        let offset = limit * currentPage - limit;

        try {

            const decoded = jwt.verify(accessToken, process.env.SECRET_ACCESS_KEY);
            const user = await User.findOne({where: {login: decoded.login}});

            const count = await Notice.count({where: {user_id: user.id}})
            let pages = Math.ceil(count / limit);

            const notices = await Notice.findAll({
                where: {
                    user_id: user.id
                },
                include: [
                    {
                        model: Photo,
                        as: 'photos',
                        attributes: ['photo_id', 'src_photo', 'contentType']
                    }
                ],
                limit,
                offset,
                order: [['createdAt', 'DESC']]
            });

            const noticesProcessed = notices.map(notice => {
                const photosWithBase64 = notice.photos.map(photo => {
                    return {
                        photo_id: photo.photo_id,
                        src_photo: photo.src_photo.toString('base64'), // Convert bytea to base64
                        contentType: photo.contentType
                    };
                });
    
                return {
                    ...notice.toJSON(),
                    typeDescription: notice.type === 0 ? "Допомога ЗСУ" : "Гуманітарна допомога",
                    photos: photosWithBase64
                };
            });
            
            return res.json({noticesProcessed, pages, message: "OK"});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getNotice(req, res, next) {

        const {id} = req.params;

        try {
            const notice = await Notice.findOne({
                where: {
                    id: id
                },
                include: [
                    {
                        model: Photo,
                        as: 'photos',
                        attributes: ['photo_id', 'src_photo', 'contentType']
                    },
                    {
                        model: User,
                        attributes: ['id', 'login', 'phone_num', 'name', 'surname', 'hideData']
                    }
                ]
            });

            if (!notice) {
                return next(ApiError.badRequest('Не знайдено!'));
            }

            const user = notice.user;

            const processedNotice = {
                ...notice.toJSON(),
                typeDescription: notice.type === 0 ? "Допомога ЗСУ" : "Гуманітарна допомога",
                photos: notice.photos.map(photo => ({
                    ...photo.toJSON(),
                    src_photo: photo.src_photo.toString('base64') // Convert blob to base64
                })),
                user: {
                    ...user.toJSON(),
                    login: user.hideData ? cipherData(user.login, 'login') : user.login,
                    phone_num: user.hideData ? cipherData(user.phone_num, 'phone_num') : user.phone_num,
                    name: user.hideData ? cipherData(user.name, 'name') : user.name,
                    surname: user.hideData ? cipherData(user.surname, 'surname') : user.surname,
                }
            };

            return res.json({processedNotice, message: "OK " + id});
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new NoticeController();