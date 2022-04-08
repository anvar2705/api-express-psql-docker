const { Sequelize } = require('sequelize')

module.exports = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  dialect: 'postgres',
  host: process.env.DB_HOST,
})

// local database
// module.exports = new Sequelize(
//   process.env.DB_NAME_LOCAL,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD_LOCAL,
//   {
//     dialect: 'postgres',
//     host: process.env.DB_HOST_LOCAL,
//     port: process.env.DB_PORT_LOCAL,
//   }
// )
