const jwt = require('jsonwebtoken')
const { decodeSession } = require('../../business-logic/session')
const { hasSameUserId } = require('../../business-logic/message')
const { logger } = require('../../logger')

const isEventChatMessage = args =>
  args[0] === 'chat-message'

const authenticationMiddleware = (args, next) => {
  if (!isEventChatMessage(args)) {
    return next()
  }

  const session = args.find(e => e.token)
  const message = args.find(d => d.user_id)

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
