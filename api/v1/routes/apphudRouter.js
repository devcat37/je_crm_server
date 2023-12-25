const Router = require('express')
const router = new Router()

const apphudController = require('../controllers/apphud_controller')

router.get('/', apphudController.getAll)
router.get('/:id', apphudController.getOne)
router.put('/:id', apphudController.edit)
router.post('/', apphudController.create)

module.exports = router 