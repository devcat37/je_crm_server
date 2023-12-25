const ApiError = require('../../error/api_error')
const { Analytics } = require('../../../models/models')

class AnalyticsController {
    async create(req, res, next) {
        try {
            const {appId, link, session_id, params} = req.body

            if(!appId) {
                return next(ApiError.badRequest('Нет параметра appId!'))
            }

            const analytics = await Analytics.create({appId, session_id, link, params})

            res.body = analytics
            return next(res)
        } catch(error) {
            return next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const analytics = await Analytics.findAll()

            res.body = analytics
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getOne(req, res, next) {

    }
}

module.exports = new AnalyticsController()