const EventEmitter = require('events')

const parserWrapper = (broker, callback) => amqpMessage => {
  try {
    const parsedMessage = JSON.parse(amqpMessage.content)
    return callback(parsedMessage)
  } catch (error) {
    broker.emit('error', error)
    return {}
  }
}

const stringifyWrapper = (broker, data) => {
  try {
    const stringifiedContent = JSON.stringify(data)
    return stringifiedContent
  } catch (error) {
    broker.emit('error', error)
    return null
  }
}

class MessageBroker extends EventEmitter {
  constructor (amqpChannel) {
    super()

    this.amqpChannel = amqpChannel
  }

  _assertQueue (queueName) {
    this.amqpChannel.assertQueue(queueName, { durable: false })
  }

  listen (queueName, callback, options = { noAck: true }) {
    this._assertQueue(queueName)

    return this.amqpChannel.consume(queueName, parserWrapper(this, callback), options)
  }

  sendToQueue (queueName, data) {
    this._assertQueue(queueName)

    const stringifiedContent = stringifyWrapper(this, data)

    if (!stringifiedContent) return

    return this.amqpChannel.sendToQueue(queueName, Buffer.from(stringifiedContent))
  }
}

const fromRabbitMq = amqpChannel =>
  new MessageBroker(amqpChannel)

module.exports = {
  fromRabbitMq
}
