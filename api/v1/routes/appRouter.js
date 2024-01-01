const Router = require('express')
const router = new Router()

const appController = require('../controllers/app_controller')

router.get('/', appController.getAll)
router.get('/:id', appController.getOne)
router.put('/:id', appController.edit)
router.post('/', appController.create)

router.post('/:id/bundle', appController.createBundle)
router.put('/:id/bundle/:bundle_id', appController.editBundle)


module.exports = router