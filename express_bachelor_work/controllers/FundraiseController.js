const ApiError = require("../error/ApiError");

class FundraiseController {

    async addFundraise(req, res, next) {
        try {

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async updateFundraise(req, res) {

    }

    async deleteFundraise(req, res) {

    }

    async getFundraises(req, res) {

    }

    async getFundraise(req, res) {
        
    }
}

module.exports = new FundraiseController();