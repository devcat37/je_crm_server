const Router = require('express')
const router = new Router()

const appRouter = require('./appRouter')
const webviewRouter = require('./webviewRouter')
const apphudRouter = require('./apphudRouter')
const appsflyerRouter = require('./appsflyerRouter')
const analyticsRouter = require('./analyticsRouter')


router.use('/app', appRouter)
router.use('/webview', webviewRouter)
router.use('/apphud', apphudRouter)
router.use('/appsflyer', appsflyerRouter)
router.use('/analytics', analyticsRouter)

module.exports = router