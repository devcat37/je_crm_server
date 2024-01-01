const Router = require('express')
const router = new Router()

const appController = require('../controllers/app_controller')

router.get('/', appController.getAll)
router.get('/:id', appController.getOne)
router.put('/:id', appController.edit)
router.post('/:id/bundle', appController.createBundle)
router.post('/', appController.create)

module.exports = router