const Joi = require('@hapi/joi')

const create = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
})

module.exports = {
  create: Joi.object({ body: create }).unknown(true),
}
