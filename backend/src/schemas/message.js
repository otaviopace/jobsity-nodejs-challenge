const Joi = require('@hapi/joi')
const pagination = require('./pagination')

const list = pagination.keys({
  text: Joi.string(),
  user_id: Joi.string(),
})

module.exports = {
  list: Joi.object({ query: list }).unknown(true),
}
