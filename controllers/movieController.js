const { Op } = require('sequelize')
const { validationResult } = require('express-validator')
const { Country } = require('../models/models')
const { Movie } = require('../models/models')
const { Genre } = require('../models/models')
const { Comment } = require('../models/models')
const ApiError = require('../error/ApiError')

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
  async get(req, res, next) {
    const { id, search } = req.query
    if (!id && !search) {
      const allMovies = await Movie.findAll({ include: [Genre, Country, Comment] })
      return res.json(allMovies)
    }
    if (id && search) {
      return next(ApiError.clientError(465, "id & search can't be used together in query params"))
    }
    if (id) {
      const movie = await Movie.findOne({ where: { id }, include: [Genre, Country, Comment] })
      return res.json(movie)
    }
    const foundMovies = await Movie.findAll({ where: { name: { [Op.like]: `%${search}%` } } })
    return res.json(foundMovies)
  }
}

module.exports = new MovieController()
