const jwt = require('jsonwebtoken')
const errorPresenter = require('../presenters/error')

const authentication = (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    return res.status(401).send(errorPresenter.fromMessage('authorization header is missing'))
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(401).send(errorPresenter.fromMessage('the string `Bearer` should prefix the auth token'))
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decodedUser

    return next()
  } catch (error) {
    return res.status(401).send(errorPresenter.fromMessage('invalid authorization token'))
  }
}

module.exports = authentication
