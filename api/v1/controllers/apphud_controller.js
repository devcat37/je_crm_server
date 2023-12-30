const ApiError = require('../../error/api_error')
const { Apphud } = require('../../../models/models')

class ApphudController {
    async create(req, res, next) {
        try {
            const { appId, api_key, product_id } = req.body

            if (!appId) {
                return next(ApiError.badRequest('Нет параметра appId!'))
            }

            const apphud = await Apphud.create({ appId, api_key, product_id })

            res.body = apphud
            return next(res)
        } catch(error) {
            return next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const apphuds = await Apphud.findAll()

            res.body = apphuds
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getOne(req, res, next) {

    }

    async edit(req, res, next) {
        try {
            const { id } = req.params
            const body = req.body

            const apphud = await Apphud.findByPk(id)
            await apphud.update(body)

            // Сохраняем изменения.
            await apphud.save()
            
            res.body = apphud

            return next(res)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new ApphudController()