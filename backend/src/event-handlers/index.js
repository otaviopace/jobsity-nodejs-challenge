const onConnection = require('./connection')

const setupEventHandlers = (io, repository, amqpChannel) => {
  io.on('connection', onConnection(io, repository, amqpChannel))
}

module.exports = setupEventHandlers
