const dotenv = require('dotenv')
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

dotenv.config()

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => res.sendStatus(200))
app.post('/', (req, res) => res.status(200).send(req.body))

app.listen(process.env.PORT || 3000)
