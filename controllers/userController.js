class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async checkAuth(req, res) {
    res.json({ message: 'qwert' })
  }
}

module.exports = new UserController()
