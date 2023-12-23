const ApiError = require('../../error/api_error')
const { Webview } = require('../../../models/models')

class WebviewController {
    async create(req, res, next) {
        try {
            const {appId, reference, enabled} = req.body

            if(!appId) {
                return next(ApiError.badRequest('Нет параметра appId!'))
            }

            const webview = await Webview.create({appId, reference, enabled})

            res.body = webview
            return next(res)
        } catch(error) {
            return next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const webviews = await Webview.findAll()

            res.body = webviews
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getOne(req, res) {

    }
}

module.exports = new WebviewController()