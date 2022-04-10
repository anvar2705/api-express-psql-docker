const Router = require('express')
const router = new Router()
const commentController = require('../controllers/commentController')
const authMiddleware = require('../middlewares/authMiddleware')
const { check } = require('express-validator')

router.post(
  '/',
  [
    check('value', 'Comment must not be empty')
      .notEmpty()
      .custom((value) => /[\S]/.test(value)),
    check('movieId', 'movieId is not correct')
      .notEmpty()
      .custom((value) => !/[\s]/.test(value) && typeof value === 'number'),
  ],
  authMiddleware,
  commentController.create
)
router.delete('/:id', authMiddleware, commentController.delete)

module.exports = router
