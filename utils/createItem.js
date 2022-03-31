const { validationResult } = require('express-validator')
const ApiError = require('../error/ApiError')

const createItem = async (req, res, next, Item) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Create item error', errors })
  }
  const { value } = req.body
  const existingItem = await Item.findOne({ where: { value } })
  if (existingItem) {
    return next(ApiError.clientError(460, 'This item already exists'))
  }
  const newValue = await Item.create({ value })
  return res.json(newValue)
}

module.exports = createItem
