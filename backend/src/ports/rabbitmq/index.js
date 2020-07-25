const amqp = require('amqplib')

const connect = async () => {
  const connection = await amqp.connect(process.env.RABBITMQ_URL)

  const channel = await connection.createChannel()

  return channel
}

const sendMessage = (channel, queue, data) => {
  channel.assertQueue(queue, { durable: false })

  return channel.sendToQueue(queue, Buffer.from(data))
}

module.exports = {
  connect,
  sendMessage,
}
