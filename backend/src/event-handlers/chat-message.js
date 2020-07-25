const businessLogic = require('../business-logic/message')

const onChatMessage = (io, repository) => async data => {
  const message = businessLogic.createMessage(data)

  const repoMessage = await repository.Message.create(message)

  io.emit('chat-message', data)
}

module.exports = onChatMessage
