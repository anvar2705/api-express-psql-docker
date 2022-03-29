const apiError = require('../error/ApiError')

module.exports = function (err, req, res, next) {
  if (err instanceof apiError) {
    return res.status(err.status).json(err.error)
  }
  return res.status(500).json({ message: 'Unexpected error!' })
}
