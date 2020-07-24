const bcrypt = require('bcryptjs')

const generateHash = async str => {
  const salt = await bcrypt.genSalt(10)

  const hash = await bcrypt.hash(str, salt)

  return hash
}

const createUser = async (username, password) => ({
  username,
  password_hash: await generateHash(password),
})

module.exports = {
  createUser,
}
