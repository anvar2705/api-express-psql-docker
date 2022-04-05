require('dotenv').config()
const express = require('express')
const sequelize = require('./db/db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandlingMiddleware')
const createUserMock = require('./utils/createUserMock')
const createGenreMock = require('./utils/createGenreMock')
const createCountryMock = require('./utils/createCountryMock')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api', router)

// last error handling middleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })

    // create default users
    createUserMock('admin', 'admin123', 'ADMIN')
    createUserMock('user', 'user123', 'USER')
    createUserMock('Anvar', 'anvar123', 'USER')

    //create default genres
    createGenreMock('Комедия')
    createGenreMock('Ужасы')
    createGenreMock('Мультфильм')
    createGenreMock('Фантастика')
    createGenreMock('Драма')
    createGenreMock('Исторический')
    createGenreMock('Документальный')
    createGenreMock('Детский')
    createGenreMock('Боевик')
    createGenreMock('Криминал')
    createGenreMock('Детектив')

    //create default countries
    createCountryMock('Россия')
    createCountryMock('США')
    createCountryMock('Китай')
    createCountryMock('Великобритания')

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
