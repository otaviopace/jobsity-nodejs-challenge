const { createServer, startServer } = require('../ports/http-server')
const { listenWebSocket } = require('../ports/web-socket')
const repository = require('../ports/repository')
const setupDotenv = require('../config')

setupDotenv()

const start = async () => {
  const repo = await repository.connect()
  console.log('success on database connection')

  const server = createServer(repo)

  listenWebSocket(server, repo)

  startServer(server)
  console.log('server started listening')
}

start()
  .catch(console.error)
