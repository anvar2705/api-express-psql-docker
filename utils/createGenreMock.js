const { Genre } = require('../models/models')

const createGenreMock = async (value) => {
  const newGenre = await Genre.findOne({ where: { value } })
  if (!newGenre) {
    await Genre.create({ value })
  }
}

module.exports = createGenreMock
