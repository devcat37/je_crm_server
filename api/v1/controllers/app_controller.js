const ApiError = require('../../error/api_error')

class AppController {
    async create(req, res) {
        const query = req.query

        const appBundleIos = req.app_bundle_ios
        const appBundleAndroid = req.app_bundle_android

        if(!appBundleIos && !appBundleAndroid) {
            return ApiError.badRequest('Нет параметров app_bundle_ios или app_bundle_android!')
        }
    }

    async getAll(req, res) {
        
    }
}

module.exports = new AppController()