const globalErrorHandler = (error, req, res, next) => {
  res.status(500).send({ errors: [{ message: 'Internal server error' }] })
  next()
}

module.exports = globalErrorHandler
