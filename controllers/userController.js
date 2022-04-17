const { validationResult } = require('express-validator')
const { User } = require('../models/models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const ApiError = require('../error/ApiError')

const generateJwt = (id, username, role) => {
  return jwt.sign({ id, username, role }, process.env.SECRET_KEY, { expiresIn: '24h' })
}

class UserController {
  async registration(req, res, next) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Registration error', errors })
    }
    const { username, password, role } = req.body
    // return res.json({ username })
    const candidate = await User.findOne({ where: { username } })
    if (candidate) {
      return next(ApiError.clientError(460, 'This user already exists'))
    }
    const hashPassword = bcrypt.hashSync(password, 5)
    const user = await User.create({ username, password: hashPassword, role })
    const token = generateJwt(user.id, user.username, user.role)
    return res.json({ token })
  }

  async login(req, res, next) {
    const { username, password } = req.body
    const user = await User.findOne({ where: { username } })
    if (!user) {
      return next(ApiError.clientError(461, 'User does not exist'))
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return next(ApiError.clientError(462, 'Wrong password'))
    }
    const token = generateJwt(user.id, user.username, user.role)
    return res.json({ token, username: user.username, id: user.id })
  }

  async checkAuth(req, res) {
    const { username } = req.user
    const user = await User.findOne({ where: { username } })
    const token = generateJwt(user.id, user.username, user.role)
    return res.json({ token, username: user.username, id: user.id })
  }

  async getUser(req, res, next) {
    const { id } = req.query
    if (!id) {
      return next(ApiError.clientError(464, 'There is not id in query'))
    }
    const user = await User.findOne({ where: { id } })
    if (!user) {
      return next(ApiError.clientError(461, 'User does not exist'))
    }
    return res.json({ id: user.id, username: user.username })
  }

  async changeUsername(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Request body is wrong', errors })
    }
    const { id } = req.user
    const { username } = req.body
    await User.update({ username }, { where: { id } })
    const user = await User.findOne({ where: { id } })
    return res.json({ id: user.id, username: user.username })
  }
}

module.exports = new UserController()
