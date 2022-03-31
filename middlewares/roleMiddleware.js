const ApiError = require('../error/ApiError')
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return next(ApiError.clientError(450, 'User is not registered'))
  }
  const { role } = jwt.verify(token, process.env.SECRET_KEY)
  if (role !== 'ADMIN') {
    return next(ApiError.clientError(451, 'User does not have access'))
  }
  next()
}
