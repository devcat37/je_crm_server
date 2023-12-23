const ApiError = require('../../error/api_error')

class AppController {
    async create(req, res) {
        const query = req.query

        const appBundleIos = req.app_bundle_ios
        const appBundleAndroid = req.app_bundle_android

        if(!appBundleIos && !appBundleAndroid) {
            return ApiError.badRequest('Нет параметров app_bundle_ios или app_bundle_android!')
        }

        res.json('jopa')
    }

    async getAll(req, res) {
        res.json({'ping': 'pong'})
    }
}

module.exports = new AppController()