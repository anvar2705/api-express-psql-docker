const sequelize = require('../db/db')
const { DataTypes } = require('sequelize')

const User = sequelize.define(
  'user',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
  },
  { timestamps: false }
)

const Movie = sequelize.define(
  'movie',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
  },
  { timestamps: false }
)

const Country = sequelize.define(
  'country',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING, unique: true },
  },
  { timestamps: false }
)

const Genre = sequelize.define(
  'genre',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING, unique: true },
  },
  { timestamps: false }
)

const Comment = sequelize.define(
  'comment',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    value: { type: DataTypes.STRING },
  },
  { timestamps: false }
)

const MovieCountry = sequelize.define(
  'movie_country',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false }
)

const MovieGenre = sequelize.define(
  'movie_genre',
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  },
  { timestamps: false }
)

Movie.belongsToMany(Country, { through: MovieCountry })
Country.belongsToMany(Movie, { through: MovieCountry })

Movie.belongsToMany(Genre, { through: MovieGenre })
Genre.belongsToMany(Movie, { through: MovieGenre })

Movie.hasMany(Comment)
Comment.belongsTo(Movie)

User.hasMany(Comment)
Comment.belongsTo(User)

module.exports = { User, Movie, Comment, Genre, Country, MovieGenre, MovieCountry }
