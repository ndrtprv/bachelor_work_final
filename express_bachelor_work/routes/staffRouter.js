const Router = require('express');
const ApiError = require("../error/ApiError");
const { Avatars, Admin, User } = require('../models/models');
const router = new Router();

router.get('/main', async (req, res, next) => {

    let limit = 3;

    try {
        const admins = await Admin.findAll({
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'login', 'phone_num', 'name', 'surname'],
                    include: [
                        {
                            model: Avatars,
                            attributes: ['id', 'data', 'contentType']
                        }
                    ]
                }
            ],
            limit,
            order: [['admin_id', 'ASC']]
        });

        const adminsProcessed = admins.map(admin => {
            const user = admin.user;

            return {
                ...admin.toJSON(),
                user: {
                    ...user.toJSON(),
                    avatars: user.avatars ? {
                        ...user.avatars.toJSON(),
                        data: user.avatars.data.toString('base64') // Convert blob to base64
                    } : null
                }
            };
        });

        return res.json({adminsProcessed, message: "OK"});
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
})

router.get('/one/:id', async (req, res, next) => {

    const {id} = req.params;

    try {
        const admin = await Admin.findOne({
            where: {
                admin_id: id
            },
            include: [
                {
                    model: User,
                    as: 'user',
                    attributes: ['id', 'login', 'phone_num', 'name', 'surname'],
                    include: [
                        {
                            model: Avatars,
                            attributes: ['id', 'data', 'contentType']
                        }
                    ]
                }
            ]
        });

        const user = admin.user;

        const processedAdmin = {
            ...admin.toJSON(),
            user: {
                ...user.toJSON(),
                avatar: user.avatar ? {
                    ...user.avatar.toJSON(),
                    data: user.avatar.data.toString('base64') // Convert blob to base64
                } : null
            }
        };

        return res.json({processedAdmin, message: "OK " + id});
    } catch (e) {
        next(ApiError.badRequest(e.message))
    }
})

module.exports = router;