const { Country } = require('../models/models')

const createCountryMock = async (value) => {
  const newCountry = await Country.findOne({ where: { value } })
  if (!newCountry) {
    await Country.create({ value })
  }
}

module.exports = createCountryMock
