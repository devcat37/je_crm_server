const Router = require('express')
const router = new Router()

const appRouter = require('./appRouter')
const webviewRouter = require('./webviewRouter')
const apphudRouter = require('./apphudRouter')
const appsflyerRouter = require('./appsflyerRouter')


router.use('/app', appRouter)
router.use('/webview', webviewRouter)
router.use('/apphud', apphudRouter)
router.use('/appsflyer', appsflyerRouter)

module.exports = router