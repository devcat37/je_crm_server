const Router = require('express')
const router = new Router()

const appsflyerController = require('../controllers/appsflyer_controller')

router.get('/', appsflyerController.getAll)
router.get('/:id', appsflyerController.getOne)
router.put('/:id', appsflyerController.edit)
router.post('/', appsflyerController.create)

module.exports = router 