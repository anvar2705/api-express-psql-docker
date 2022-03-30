const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
const { check } = require('express-validator')
const authMiddleware = require('../middlewares/authMiddleware')

router.post(
  '/registration',
  [
    check('username', 'Username must not be empty or contain spaces')
      .notEmpty()
      .custom((value) => !/\s/.test(value)),
    check('password', 'Password length must be more than 6 characters').isLength({ min: 6 }),
    check('role', 'Role is not correct').isIn(['USER', 'ADMIN', undefined]),
  ],
  userController.registration
)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.checkAuth)

module.exports = router
