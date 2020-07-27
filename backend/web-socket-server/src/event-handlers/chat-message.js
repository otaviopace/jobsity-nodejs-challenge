const { createMessage, isCommand } = require('common/src/business-logic/message')
const { buildCommand } = require('common/src/business-logic/command')


const onChatMessage = (io, repository, messageBroker) => async data => {
  const message = createMessage(data)

  if (isCommand(message)) {
    const command = buildCommand(message.text)
    await messageBroker.sendToQueue('commands', command)
    return
  }

  const repoMessage = await repository.Message.create(message)

  io.emit('chat-message', repoMessage)
}

module.exports = onChatMessage
