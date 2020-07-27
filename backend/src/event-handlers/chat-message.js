const businessLogic = require('../business-logic/message')

const buildCommand = text => {
  const [commandName, parameter] = text.split('=')

  switch (commandName) {
    case '/stock':
      return { type: 'stock', parameters: { stock_code: parameter } }
    default:
      return { type: 'unknown', parameters: {} }
  }
}

const isCommand = message =>
  message.text.startsWith('/')

const onChatMessage = (io, repository, messageBroker) => async data => {
  const message = businessLogic.createMessage(data)

  if (isCommand(message)) {
    const command = buildCommand(message.text)
    await messageBroker.sendToQueue('commands', command)
    return
  }

  const repoMessage = await repository.Message.create(message)

  io.emit('chat-message', repoMessage)
}

module.exports = onChatMessage
