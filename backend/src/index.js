const { createServer } = require('http')
const Promise = require('bluebird')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const socketIO = require('socket.io')
const setupDotenv = require('./config')
const setupGracefulShutdown = require('./shutdown')
const { connectToDatabase } = require('./database')
const DatabaseError = require('./errors/database')

setupDotenv()

const app = express()

app.use(cors())
app.use(bodyParser.json())
const authMiddleware = (req, res, next) => {
  const authHeader = req.get('Authorization')

  if (!authHeader) {
    return res.status(401).send({ errors: [{ message: 'authorization header is missing' }] })
  }

  const [bearer, token] = authHeader.split(' ')

  if (bearer !== 'Bearer') {
    return res.status(401).send({ errors: [{ message: 'the string `Bearer` should prefix the auth token' }] })
  }

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET)

    req.user = decodedUser

    return next()
  } catch (error) {
    return res.status(401).send({ errors: [{ message: 'invalid authorization token' }] })
  }
}

app.get('/health_check',  (req, res) => res.sendStatus(200))
app.get('/', authMiddleware, (req, res) => res.sendStatus(200))
app.post('/', authMiddleware, (req, res) => res.status(200).send(req.body))

const startServer = server =>
  server.listen(process.env.PORT || 4000)

const start = () => Promise.resolve((async () => {
  const db = await connectToDatabase()
  console.log('success on database connection')

  app.post('/users', async (req, res) => {
    const username = req.body.username
    const existingUser = await db.models.User.findOne({ where: {username} })

    if (existingUser) {
      return res.status(400).send({ errors: [{ message: 'username already exists' }] })
    }

    const salt = await bcrypt.genSalt(10)

    const password_hash = await bcrypt.hash(req.body.password, salt)

    const user = await db.models.User.create({
      username,
      password_hash,
    })

    delete user.dataValues.password_hash

    return res.status(201).send(user)
  })

  app.post('/sessions', async (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const user = await db.models.User.findOne({ where: {username} })

    if (!user) {
      return res.status(401).send({ errors: [{ message: 'username or passord are incorrect !user' }] })
    }

    const isCorrectPassword = await bcrypt.compare(password, user.password_hash)

    if (!isCorrectPassword) {
      return res.status(401).send({ errors: [{ message: 'username or passord are incorrect !isCorrectPassword' }] })
    }

    const jwtPayload = {
      id: user.id,
      username,
    }

    const expiresIn = 604800 // 1 week in seconds

    const token = jwt.sign(
      jwtPayload,
      process.env.JWT_SECRET,
      { expiresIn }
    )

    return res.status(201).send({
      token,
    })
  })

  const server = createServer(app)

  const io = socketIO(server)

  io.on('connection', socket => {
    console.log('a user connected')

    socket.on('chat-message', data => {
      console.log(`user '${data.username}' messaged '${data.text}' on chat`)
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
