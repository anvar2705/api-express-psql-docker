const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define('user', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  username: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: 'USER' },
})

const Movie = sequelize.define('movie', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
})

const Country = sequelize.define('country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, unique: true },
})

const Genre = sequelize.define('genre', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, unique: true },
})

const Comment = sequelize.define('comment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING },
})

const MovieCountry = sequelize.define('movie_country', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const MovieGenre = sequelize.define('movie_genre', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

Movie.belongsToMany(Country, { through: MovieCountry })
Country.belongsToMany(Movie, { through: MovieCountry })

Movie.belongsToMany(Genre, { through: MovieGenre })
Genre.belongsToMany(Movie, { through: MovieGenre })

Movie.hasMany(Comment)
Comment.belongsTo(Movie)

User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = { User, Movie, Comment, Genre, Country, MovieGenre, MovieCountry }
