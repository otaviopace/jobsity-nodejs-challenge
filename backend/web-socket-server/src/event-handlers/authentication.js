const { decodeSession } = require('common/src/business-logic/session')
const { hasSameUserId } = require('common/src/business-logic/message')
const { logger } = require('common/src/logger')

const authenticationMiddleware = eventNames => (args, next) => {
  if (!eventNames.includes(args[0])) {
    return next()
  }

  const session = args.find(arg => arg.token)
  const message = args.find(arg => arg.user_id)

  try {
    if (!session || !message) {
      throw new Error('Session or message empty')
    }

    const decodedUser = decodeSession(session.token)

    if (!hasSameUserId(decodedUser, message)) {
      throw new Error('Not the same user')
    }

    return next()
  } catch (error) {
    logger.error(error)
    return next(new Error('Authentication failed'))
  }
}

module.exports = authenticationMiddleware
