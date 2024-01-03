const Router = require('express')
const router = new Router()

const installsController = require('../controllers/installs_controller')

router.get('/', installsController.getAll)
router.get('/:id', installsController.getOne)
router.post('/', installsController.create)

module.exports = router