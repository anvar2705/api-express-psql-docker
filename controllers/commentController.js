const { validationResult } = require('express-validator')
const { Comment } = require('../models/models')
const { Movie, User } = require('../models/models')
const ApiError = require('../error/ApiError')

class CommentController {
  async create(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Create comment error', errors })
    }
    const userId = req.user.id
    const { value, movieId } = req.body

    const user = await User.findOne({ where: { id: userId } })
    const movie = await Movie.findOne({ where: { id: movieId } })
    if (!movie) {
      return next(ApiError.clientError(461, 'Movie does not exist'))
    }

    const comment = await Comment.create({ value })
    await comment.setMovie(movie)
    await comment.setUser(user)

    return res.json(comment)
  }

  async delete(req, res, next) {
    const { id } = req.params
    const userId = req.user.id
    const comment = await Comment.findOne({ where: { id } })
    if (userId === comment.userId) {
      await Comment.destroy({ where: { id: comment.id } })
      return res.json(comment)
    } else return next(ApiError.clientError(463, "You don't have access"))
  }
}

module.exports = new CommentController()
