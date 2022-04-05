const { Movie, Country, Genre, User, Comment } = require('../models/models')

const createMovieMock = async (name, description, image, countries, genres, comments) => {
  const movie = await Movie.findOne({ where: { name } })
  if (!movie) {
    const createdMovie = await Movie.create({ name, description, image })
    if (countries.length !== 0) {
      for (let country of countries) {
        const foundCountry = await Country.findOne({ where: { value: country } })
        if (foundCountry) {
          await createdMovie.addCountry(foundCountry)
        }
      }
    }
    if (genres.length !== 0) {
      for (let genre of genres) {
        const foundGenre = await Genre.findOne({ where: { value: genre } })
        if (foundGenre) {
          await createdMovie.addGenre(foundGenre)
        }
      }
    }

    //add comments
    if (comments.length !== 0) {
      const user1 = await User.findOne({ where: { id: 2 } })

      for (let comment of comments) {
        const createdComment = await Comment.create({ value: comment })
        await createdComment.setMovie(createdMovie)
        await createdComment.setUser(user1)
      }
    }
  }
}

module.exports = createMovieMock
