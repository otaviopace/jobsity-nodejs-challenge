const messagePresenter = require('../presenters/message')
const { Op } = require('sequelize')

const isEmpty = obj =>
  Object.keys(obj).length === 0

const buildWhere = query => {
  if (isEmpty(query)) {
    return {}
  }

  return Object.entries(query)
    .reduce((where, [key, value]) => {
      const isString = typeof value === 'string'
      const includedValue = isString
        ? `%${value}%`
        : value

      return {
        ...where,
        [key]: {
          [Op.like]: includedValue,
        },
      }
    }, {})
}

const queryableFields = ['text', 'user_id']

const filterQueriableFields = reqQuery => {
  const filteredList = Object.entries(reqQuery)
    .filter(([key, value]) => queryableFields.includes(key))

  return Object.fromEntries(filteredList)
}

const clamp = (min, max, value) =>
  Math.min(Math.max(value, min), max)

const buildPaginationQuery = options => {
  const { page = 1, count = 10 } = options

  const limit = clamp(1, 50, count)
  const offset = (Math.max(1, page) - 1) * limit

  return {
    limit,
    offset,
  }
}

const list = repository => async (req, res) => {
  const query = filterQueriableFields(req.query)
  const pagination = { page: req.query.page, count: req.query.count }

  const paginationQuery = buildPaginationQuery(pagination)

  const messages = await repository.Message.findAll({
    where: buildWhere(query),
    order: [['id', 'DESC']],
    ...paginationQuery,
  })

  res.status(200).send(messages.map(messagePresenter))
}

module.exports = {
  list,
}
