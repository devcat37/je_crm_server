const Router = require('express')
const router = new Router()

const appController = require('../controllers/app_controller')

router.get('/', appController.getAll)
router.post('/', appController.create)

module.exports = router