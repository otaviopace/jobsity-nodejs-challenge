const businessLogic = require('../business-logic/message')
const { sendMessage } = require('../ports/rabbitmq')

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

const onChatMessage = (io, repository, amqpChannel) => async data => {
  const message = businessLogic.createMessage(data)

  if (isCommand(message)) {
    const command = buildCommand(message.text)
    await sendMessage(amqpChannel, 'commands', JSON.stringify(command))
    return
  }

  const repoMessage = await repository.Message.create(message)

  io.emit('chat-message', data)
}

module.exports = onChatMessage
