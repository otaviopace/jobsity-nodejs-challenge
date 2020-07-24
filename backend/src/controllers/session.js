const businessLogic = require('../business-logic/session')
const sessionPresenter = require('../presenters/session')

const create = db => async (req, res) => {
  const user = await db.models.User.findOne({
    where: {
      username: req.body.username,
    },
  })

  if (!user) {
    return res.status(401).send({ errors: [{ message: 'username or passord are incorrect !user' }] })
  }

  const isPasswordCorrect = await businessLogic.areTheSamePassword(
    req.body.password,
    user.password_hash
  )

  if (!isPasswordCorrect) {
    return res.status(401).send({ errors: [{ message: 'username or passord are incorrect !isCorrectPassword' }] })
  }

  const session = businessLogic.createSession(user.id, req.body.username)

  return res.status(201).send(sessionPresenter(session))
}

module.exports = {
  create,
}
