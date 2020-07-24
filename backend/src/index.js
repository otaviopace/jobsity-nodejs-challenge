const { createServer } = require('http')
const socketIO = require('socket.io')
const Promise = require('bluebird')
const { createApp } = require('./ports/http-server/app')
const setupDotenv = require('./config')
const setupGracefulShutdown = require('./shutdown')
const { connectToDatabase } = require('./database')
const DatabaseError = require('./errors/database')

setupDotenv()

const startServer = server =>
  server.listen(process.env.PORT || 4000)

const start = () => Promise.resolve((async () => {
  const db = await connectToDatabase()
  console.log('success on database connection')

  const app = createApp(db)

  const server = createServer(app)

  const io = socketIO(server)

  io.on('connection', socket => {
    console.log('a user connected')

    socket.on('chat-message', async data => {
      console.log(`user '${data.username}' messaged '${data.text}' on chat`)
      const message = await db.models.Message.create({
        text: data.text,
        user_id: data.user_id,
      })
      console.log('db message', message)
      io.emit('chat-message', data)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })

  startServer(server)
  console.log('server started listening')

  setupGracefulShutdown(server)
})())

start()
  .catch(DatabaseError, error => console.error('failed to connect to database, error:', error))
  .catch(error => console.error('unknown error:', error))
