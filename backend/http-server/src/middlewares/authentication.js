const businessLogic = require('common/src/business-logic/session')
const errorPresenter = require('../presenters/error')

const authentication = (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    return res.status(401).send(errorPresenter.fromMessage('Authorization header is missing'))
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(401).send(errorPresenter.fromMessage('\'Bearer\' prefix missing on Authorization header'))
  }

  try {
    const decodedUser = businessLogic.decodeSession(token)

    req.user = decodedUser

    return next()
  } catch (error) {
    return res.status(401).send(errorPresenter.fromMessage('Invalid token on Authorization header'))
  }
}

module.exports = authentication
