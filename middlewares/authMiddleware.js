const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

module.exports = function (req, res, next) {
  if (req.method === 'OPTIONS') {
    next()
  }

  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    return next(ApiError.clientError(454, 'User is not registered'))
  }
  req.user = jwt.verify(token, process.env.SECRET_KEY)
  next()
}
