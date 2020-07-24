const Promise = require('bluebird')
const { createServer, startServer } = require('./ports/http-server')
const { listenWebSocket } = require('./ports/web-socket')
const setupDotenv = require('./config')
const { connectToDatabase } = require('./database')
const DatabaseError = require('./errors/database')

setupDotenv()

const start = () => Promise.resolve((async () => {
  const db = await connectToDatabase()
  console.log('success on database connection')

  const server = createServer(db)

  listenWebSocket(server, db)

  startServer(server)
  console.log('server started listening')
})())

start()
  .catch(DatabaseError, error => console.error('failed to connect to database, error:', error))
  .catch(error => console.error('unknown error:', error))
