const Router = require('express')
const router = new Router()
const countryController = require('../controllers/countryController')
const { check } = require('express-validator')
const roleMiddleware = require('../middlewares/roleMiddleware')

router.post(
  '/',
  [
    check('value', 'Country must not have spaces in the start of name')
      .notEmpty()
      .custom((value) => !/^[\s]/.test(value)),
  ],
  roleMiddleware,
  countryController.create
)
router.get('/', countryController.get)

module.exports = router
