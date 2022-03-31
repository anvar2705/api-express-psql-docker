const { Genre } = require('../models/models')
const createItem = require('../utils/createItem')
const getAllItemsOrById = require('../utils/getAllItemsOrById')

class GenreController {
  async create(req, res, next) {
    await createItem(req, res, next, Genre)
  }

  async get(req, res) {
    await getAllItemsOrById(req, res, Genre)
  }
}

module.exports = new GenreController()
