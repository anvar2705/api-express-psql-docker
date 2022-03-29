const Router = require('express')
const router = new Router()
const movieController = require('../controllers/movieController')

router.post('/', movieController.create)
router.get('/', movieController.getAll)
router.get('/:id', movieController.getOne)

module.exports = router
