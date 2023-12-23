const Router = require('express')
const router = new Router()

const webviewController = require('../controllers/webview_controller')

router.get('/', webviewController.getAll)
router.get('/:id', webviewController.getOne)
router.post('/', webviewController.create)

module.exports = router 