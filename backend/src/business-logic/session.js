const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const areTheSamePassword = (password, passwordHash) =>
  bcrypt.compare(
    password,
    passwordHash
  )

const createSession = (userId, username) => {
  const jwtPayload = {
    id: userId,
    username,
  }

  const WEEK_IN_SECONDS = 604800

  const token = jwt.sign(
    jwtPayload,
    process.env.JWT_SECRET,
    { expiresIn: WEEK_IN_SECONDS }
  )

  return { token }
}

module.exports = {
  areTheSamePassword,
  createSession,
}
