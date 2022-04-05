require('dotenv').config()
const express = require('express')
const sequelize = require('./db/db')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middlewares/errorHandlingMiddleware')
const createUserMock = require('./utils/createUserMock')
const createGenreMock = require('./utils/createGenreMock')
const createCountryMock = require('./utils/createCountryMock')
const createMovieMock = require('./utils/createMovieMock')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))
app.use(express.json())
app.use('/api', router)

// last error handling middleware
app.use(errorHandler)

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })

    // create default users
    await createUserMock('admin', 'admin123', 'ADMIN')
    await createUserMock('user', 'user123', 'USER')
    await createUserMock('Anvar', 'anvar123', 'USER')

    // create default genres
    await createGenreMock('Комедия')
    await createGenreMock('Ужасы')
    await createGenreMock('Мультфильм')
    await createGenreMock('Фантастика')
    await createGenreMock('Драма')
    await createGenreMock('Исторический')
    await createGenreMock('Документальный')
    await createGenreMock('Детский')
    await createGenreMock('Боевик')
    await createGenreMock('Криминал')
    await createGenreMock('Детектив')

    // create default countries
    await createCountryMock('Россия')
    await createCountryMock('США')
    await createCountryMock('Китай')
    await createCountryMock('Великобритания')

    // create default movies
    await createMovieMock(
      'Мульт в кино. Выпуск №103. Некогда грустить!',
      'В новом выпуске ми-ми-мишки изобретут машину сна, а Дракоша Тоша научит завязывать шнурки.',
      '1',
      ['Россия'],
      ['Детский', 'Мультфильм'],
      ['Неплохой фильм.', 'Я разочарован...', 'Всем советую глянуть!']
    )
    await createMovieMock(
      'Новый Бэтмен',
      'После двух лет поисков правосудия на улицах Готэма для своих сограждан Бэтмен становится ... ',
      '2',
      ['США'],
      ['Боевик', 'Драма', 'Криминал', 'Детектив'],
      ['Неплохой фильм.', 'Я разочарован...', 'Всем советую глянуть!']
    )
    await createMovieMock(
      'Однажды в… Голливуде',
      '1969 год, золотой век Голливуда уже закончился. Известный актёр Рик Далтон и его дублер Клифф Бут пытаются ...',
      '3',
      ['США'],
      ['Драма', 'Комедия'],
      ['Неплохой фильм.', 'Я разочарован...', 'Всем советую глянуть!']
    )
    await createMovieMock(
      'Стриптизерши',
      'Танцовщицы элитного стриптиз-клуба, клиенты которого — известные финансисты с Уолл-Стрит, привыкли к большим ...',
      '4',
      ['США'],
      ['Комедия', 'Криминал', 'Драма'],
      ['Неплохой фильм.', 'Я разочарован...', 'Всем советую глянуть!']
    )

    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
  } catch (e) {
    console.log(e)
  }
}

start()
