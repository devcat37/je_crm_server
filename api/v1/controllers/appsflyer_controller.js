const ApiError = require('../../error/api_error')
const { Appsflyer } = require('../../../models/models')

class AppsflyerController {
    async create(req, res, next) {
        try {
            const {appId, dev_key, appsflyer_app_id} = req.body

            if(!appId) {
                return next(ApiError.badRequest('Нет параметра appId!'))
            }

            const appsflyer = await Appsflyer.create({appId, dev_key, appsflyer_app_id})

            res.body = appsflyer
            return next(res)
        } catch(error) {
            return next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const appsflyers = await Appsflyer.findAll()

            res.body = appsflyers
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getOne(req, res, next) {

    }

    async edit(req, res, next) {
        try {
            const {id} = req.params
            const body = req.body

            const appsflyer = await Appsflyer.findByPk(id)
            await appsflyer.update(body)

            // Сохраняем изменения.
            await appsflyer.save()
            
            res.body = appsflyer

            return next(res)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new AppsflyerController()