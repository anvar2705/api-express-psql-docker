const { Country } = require('../models/models')
const createItem = require('../utils/createItem')
const getAllItemsOrById = require('../utils/getAllItemsOrById')

class CountryController {
  async create(req, res, next) {
    await createItem(req, res, next, Country)
  }

  async get(req, res) {
    await getAllItemsOrById(req, res, Country)
  }
}

module.exports = new CountryController()
