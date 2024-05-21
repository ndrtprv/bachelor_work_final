const ApiError = require("../error/ApiError");

class NoticeController {

    async addNotice(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async updateNotice(req, res) {

    }

    async deleteNotice(req, res) {

    }

    async getNotices(req, res) {

    }

    async getNotice(req, res) {

    }
}

module.exports = new NoticeController();