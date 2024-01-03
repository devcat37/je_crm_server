const ApiError = require('../../error/api_error')
const { Installation } = require('../../../models/models')

class InstallsController {
    async create(req, res, next) {
        try {
            const { appId, params } = req.body

            if(!appId) {
                return next(ApiError.badRequest('Нет параметра appId!'))
            }

            const install = await Installation.create({ appId, params })

            res.body = install
            return next(res)
        } catch(error) {
            return next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const installs = await Installation.findAll()

            res.body = installs
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getOne(req, res, next) {

    }
}

module.exports = new InstallsController()