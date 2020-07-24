const { validateSchema } = require('../schemas')

const validation = schema => (req, res, next) => {
  try {
    const value = validateSchema(schema, req)

    req.body = req.body ? value.body : req.body
    req.query = req.query ? value.query : req.query

    next()
  } catch (error) {
    res.status(400).send({ errors: error.details })
  }
}

module.exports = validation
