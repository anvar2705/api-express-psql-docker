const { validationResult } = require('express-validator')
const ApiError = require('../error/ApiError')
const { Country } = require('../models/models')
const { Movie } = require('../models/models')
const { Genre } = require('../models/models')
const getAllItemsOrById = require('../utils/getAllItemsOrById')

class MovieController {
  async create(req, res) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Create movie error', errors })
    }
    const { name, description, image, countries, genres } = req.body
    const createdMovie = await Movie.create({ name, description, image })

    if (countries?.length) {
      for (let country of countries) {
        const foundCountry = await Country.findOne({ where: { value: country } })
        if (foundCountry) {
          await createdMovie.addCountry(foundCountry)
        }
      }
    }
    if (genres?.length) {
      for (let genre of genres) {
        const foundGenre = await Genre.findOne({ where: { value: genre } })
        if (foundGenre) {
          await createdMovie.addGenre(foundGenre)
        }
      }
    }

    const movie = await Movie.findOne({ where: { id: createdMovie.id }, include: [Genre, Country] })
    res.json(movie)
  }
  async get(req, res) {
    const { id } = req.query
    if (!id) {
      const allMovies = await Movie.findAll({ include: [Genre, Country] })
      return res.json(allMovies)
    }
    const movie = await Movie.findOne({ where: { id }, include: [Genre, Country] })
    return res.json(movie)
  }
}

module.exports = new MovieController()
