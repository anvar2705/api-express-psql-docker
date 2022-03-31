const getAllItemsOrById = async (req, res, Item) => {
  const { id } = req.query
  if (!id) {
    const allItems = await Item.findAll()
    return res.json(allItems)
  }
  const item = await Item.findOne({ where: { id } })
  return res.json(item)
}

module.exports = getAllItemsOrById
