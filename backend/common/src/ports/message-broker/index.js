const rabbitmq = require('../rabbitmq')
const { fromRabbitMq } = require('./from-rabbitmq')

const connect = async () => {
  const amqpChannel = await rabbitmq.connect()

  const msgBroker = fromRabbitMq(amqpChannel)

  return msgBroker
}

module.exports = {
  connect
}
