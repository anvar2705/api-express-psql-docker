const Router = require('express')
const router = new Router()
const movieController = require('../controllers/movieController')
const { check } = require('express-validator')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.post(
  '/',
  [
    check('name', 'Movie name must not be empty or contain spaces in the start')
      .notEmpty()
      .custom((value) => !/^[\s]/.test(value)),
    check('description', 'Movie description must not be empty or contain spaces in the start')
      .notEmpty()
      .custom((value) => !/^[\s]/.test(value)),
  ],
  roleMiddleware,
  movieController.create
)
router.get('/', movieController.get)

module.exports = router
