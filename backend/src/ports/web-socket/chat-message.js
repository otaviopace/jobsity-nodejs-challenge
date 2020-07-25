const businessLogic = require('../../business-logic/message')

const onChatMessage = (io, repository) => async data => {
  console.log(`user '${data.username}' messaged '${data.text}' on chat`)

  const message = businessLogic.createMessage(data)
  console.log('business-logic message', message)

  const repoMessage = await repository.Message.create(message)

  io.emit('chat-message', data)
}

module.exports = onChatMessage
