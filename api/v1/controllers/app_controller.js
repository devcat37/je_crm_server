const ApiError = require('../../error/api_error')
const { App, BundleId } = require('../../../models/models')
const { Op } = require('sequelize')

class AppController {
    

    static appAssosiations = [
        {
            association: 'webview',
        },
        {
            model: BundleId,
            allowNull: true,
        },
        {
            association: 'appsflyer',
            allowNull: true,
        },
        {
            association: 'apphud',
            allowNull: true,
        },
        
    ]

    async create(req, res, next) {
        try {
            const body = req.body

            const name = body.name
            const app_bundle_ios = body.app_bundle_ios
            const app_bundle_android = body.app_bundle_android

            // if (!(app_bundle_ios || app_bundle_android)) {
            //     return next(ApiError.badRequest('Нет параметров app_bundle_ios или app_bundle_android!'))
            // }

            if (!name) {
                return next(ApiError.badRequest('Нет параметра name!'))
            }

            let app = await App.create({ name });

            if (app_bundle_ios || app_bundle_android) {
                const bundle = await BundleId.create({ 
                    appId: app.id,
                    app_bundle_android: app_bundle_android ?? null, 
                    app_bundle_ios: app_bundle_ios ?? null, 
                    type: 'release',
                })

                if (bundle) {
                    app = await App.findByPk(app.id, { include: AppController.appAssosiations });
                }
            }
            
            res.body = app
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const { app_bundle_ios, app_bundle_android } = req.query

            if (app_bundle_ios || app_bundle_android) {
                return await AppController.#getByAppBundle(req, res, next)
            }

            const apps = await App.findAll({
                include: AppController.appAssosiations,
            })

            res.body = apps
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    static async #getByAppBundle(req, res, next) {
        try {
            const { app_bundle_ios, app_bundle_android } = req.query
            let { type } = req.query

            if (!type) {
                type = 'debug'
            }

            if (!(app_bundle_ios || app_bundle_android)) {
                return next(ApiError.badRequest('Нет параметров app_bundle_ios или app_bundle_android!'))
            }

            const bundle = await BundleId.findOne({
                where: { 
                    [Op.and]: [
                        { type: type },
                        {
                            [Op.or]: [ 
                                !app_bundle_ios ? {} : { app_bundle_ios: app_bundle_ios, },
                                !app_bundle_android ? {} : { app_bundle_android: app_bundle_android, },
                            ],
                        },
                    ],
                    // app_bundle_ios: app_bundle_ios 
                },
            })

            if (!bundle) {
                return next(ApiError.badRequest('Не найдена конфигурация для указанных bundle ids'))
            }

            const app = await App.findByPk(bundle.appId, {
                include: AppController.appAssosiations,
            })

            res.body = app
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params
            const app = await App.findByPk(id, {
                include: AppController.appAssosiations,
            })

            res.body = app
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async edit(req, res, next) {
        try {
            const { id } = req.params
            const body = req.body

            const app = await App.findByPk(id, {
                include: AppController.appAssosiations,
            })
            await app.update(body)

            // Сохраняем изменения.
            await app.save()
            
            res.body = app

            return next(res)
        } catch (error) {
            return next(error)
        }
    }    

    async createBundle(req, res, next) {
        try {
            const { id } = req.params
            const { app_bundle_ios, app_bundle_android, type } = req.body
            
            // Ищем приложение по ID.
            const app = await App.findByPk(id)

            if (!app) {
                return next(ApiError.badRequest(`Не существует приложения с ID ${id}`))
            }

            if (!((app_bundle_ios || app_bundle_android) && type)) {
                return next(ApiError.badRequest(`Необходимы параметры (app_bundle_ios или app_bundle_android) и type [debug, release]`))
            }

            const bundle = await BundleId.create({
                appId: id,
                app_bundle_ios, app_bundle_android, type,
            })

            res.body = bundle
            return next(res)
        } catch (error) {
            return next(error)
        }
    }

    async editBundle(req, res, next) {
        try {
            const { id, bundle_id } = req.params
            const body = req.body

            const app_bundle_ios = body.app_bundle_ios
            const app_bundle_android = body.app_bundle_android
            
            // Ищем приложение по ID.
            const app = await App.findByPk(id)

            if (!app) {
                return next(ApiError.badRequest(`Не существует приложения с ID ${id}`))
            }

            if (!(app_bundle_ios || app_bundle_android)) {
                return next(ApiError.badRequest(`Необходимы параметры (app_bundle_ios или app_bundle_android)`))
            }

            const bundle = await BundleId.findByPk(bundle_id)

            await bundle.update(body)

            // Сохраняем изменения.
            await bundle.save()

            res.body = bundle
            return next(res)
        } catch (error) {
            return next(error)
        }
    }
}

module.exports = new AppController()