const bcrypt = require('bcryptjs')

const create = db => async (req, res) => {
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
}

module.exports = {
  create,
}
