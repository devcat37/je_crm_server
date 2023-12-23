const Router = require('express')
const router = new Router()

const webviewController = require('../controllers/app_controller')

router.get('/', webviewController.getAll)
router.post('/', webviewController.create)

module.exports = router 