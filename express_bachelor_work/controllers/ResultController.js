const ApiError = require("../error/ApiError");

class ResultController {

    async addResult (req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getResults (req, res) {

    }

    async getResult (req, res) {

    }
}

module.exports = new ResultController();