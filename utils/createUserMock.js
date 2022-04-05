const { User } = require('../models/models')
const bcrypt = require('bcryptjs')

const createUserMock = async (username, password, role) => {
  const user = await User.findOne({ where: { username } })
  if (!user) {
    const hashPassword = bcrypt.hashSync(password, 5)
    await User.create({ username, password: hashPassword, role })
  }
}

module.exports = createUserMock
