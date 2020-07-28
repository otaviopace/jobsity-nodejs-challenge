const messagePresenter = require('../presenters/message')
const { buildWhere, buildPagination, defaultOrdering } = require('common/src/ports/sequelize/query')

const queryableFields = ['text', 'user_id', 'username']

const list = repository => async (req, res) => {
  const messages = await repository.Message.findAll({
    ...buildWhere(req.query, queryableFields),
    ...defaultOrdering,
    ...buildPagination({ page: req.query.page, count: req.query.count })
  })

  res.status(200).send(messages.map(messagePresenter))
}

module.exports = {
  list
}
