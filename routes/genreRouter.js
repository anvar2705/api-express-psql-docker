const Router = require('express')
const router = new Router()
const genreController = require('../controllers/genreController')
const { check } = require('express-validator')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.post(
  '/',
  [
    check('value', 'Genre must not have spaces in the start of name')
      .notEmpty()
      .custom((value) => !/^[\s]/.test(value)),
  ],
  roleMiddleware,
  genreController.create
)
router.get('/', genreController.get)

module.exports = router
