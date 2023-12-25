const ApiError = require('../../error/api_error')
const { App } = require('../../../models/models')

class AppController {
    async create(req, res, next) {
        try {
            const body = req.body

            const app_bundle_ios = body.app_bundle_ios
            const app_bundle_android = body.app_bundle_android

            if(!app_bundle_ios && !app_bundle_android) {
                return next(ApiError.badRequest('Нет параметров app_bundle_ios или app_bundle_android!'))
            }

            const app = await App.create({app_bundle_ios, app_bundle_android});
            
            res.body = app
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const apps = await App.findAll({
                include: [{
                    association: 'webview',
                    right: true,
                  }],
            })

            res.body = apps
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const app = await App.findByPk(id, {
                include: [{
                    association: 'webview',
                    right: true,
                  }],
            })

            res.body = app
            next(res)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new AppController()