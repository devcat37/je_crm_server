const ApiError = require('../../error/api_error')

class AppController {
    async create(req, res, next) {
        console.log('Hello')
        const query = req.body

        const appBundleIos = query.app_bundle_ios
        const appBundleAndroid = query.app_bundle_android

        if(!appBundleIos && !appBundleAndroid) {
            return next(ApiError.badRequest('Нет параметров app_bundle_ios или app_bundle_android!'))
        }

        res.json('jopa')
    }

    async getAll(req, res) {
        res.json({'ping': 'pong'})
    }
}

module.exports = new AppController()