const bcrypt = require('bcryptjs')
const cuidWithPrefix = require('./cuid')

const generateUserId = cuidWithPrefix('usr_')

const generateHash = async str => {
  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hash(str, salt)

  return hash
}

const createUser = async (username, password) => ({
  id: generateUserId(),
  username,
  password_hash: await generateHash(password),
})

module.exports = {
  createUser,
  generateHash,
  generateUserId,
}
