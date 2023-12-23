const Router = require('express')
const router = new Router()

const appsRouter = require('./appRouter')
const webviewsRouter = require('./webviewRouter')


router.use('/apps', appsRouter)
router.use('/webviews', webviewsRouter)

module.exports = router