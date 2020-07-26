const onChatMessage = require('./chat-message')
const onDisconnect = require('./disconnect')
const authenticationMiddleware = require('./authentication')
const { catchAsyncError, catchSyncError } = require('./catch-error')
const { logger } = require('../logger')

const parseMessage = message => {
  try {
    return JSON.parse(message)
  } catch (error) {
    return null
  }
}

const onConnection = (io, repository, amqpChannel) => socket => {
  logger.info('An user connected to the chat')

  socket.use(authenticationMiddleware(['chat-message']))

  socket.on('chat-message', catchAsyncError(io, onChatMessage(io, repository, amqpChannel)))

  socket.on('disconnect', catchSyncError(io, onDisconnect))

  amqpChannel.assertQueue('messages', { durable: false })

  amqpChannel.consume('messages', async data => {
    const message = parseMessage(data.content)

    if (!message) {
      logger.warn(`Message bad JSON format: ${data.content}`)
      return
    }

    io.emit('chat-message', message)
  }, {
    noAck: true
  })
}

module.exports = onConnection
