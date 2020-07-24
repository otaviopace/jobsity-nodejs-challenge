const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const create = db => async (req, res) => {
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
}

module.exports = {
  create,
}
