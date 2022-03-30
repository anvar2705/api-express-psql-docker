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
      return next(ApiError.clientError(451, 'This user already exists'))
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
      return next(ApiError.clientError(452, 'User does not exist'))
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return next(ApiError.clientError(453, 'Wrong password'))
    }
    const token = generateJwt(user.id, user.username, user.role)
    return res.json({ token, username: user.username })
  }
  async checkAuth(req, res) {
    const { username } = req.user
    const user = await User.findOne({ where: { username } })
    const token = generateJwt(user.id, user.username, user.role)
    return res.json({ token, username: user.username })
  }
}

module.exports = new UserController()
