const Router = require('express')
const router = new Router()

const analyticsController = require('../controllers/analytics_controller')

router.get('/', analyticsController.getAll)
router.get('/:id', analyticsController.getOne)
router.post('/', analyticsController.create)

module.exports = router