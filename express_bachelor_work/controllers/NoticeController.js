const ApiError = require("../error/ApiError");

class NoticeController {

    async addNotice (req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getNotices (req, res) {

    }

    async getNotice (req, res) {

    }
}

module.exports = new NoticeController();