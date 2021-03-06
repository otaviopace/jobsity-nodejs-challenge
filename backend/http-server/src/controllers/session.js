const businessLogic = require('common/src/business-logic/session')
const sessionPresenter = require('../presenters/session')
const errorPresenter = require('../presenters/error')

const create = repository => async (req, res) => {
  const user = await repository.User.findOne({
    where: {
      username: req.body.username
    }
  })

  if (!user) {
    return res.status(401).send(errorPresenter.fromMessage('Fields username and/or password are incorrect'))
  }

  const isPasswordCorrect = await businessLogic.areTheSamePassword(
    req.body.password,
    user.password_hash
  )

  if (!isPasswordCorrect) {
    return res.status(401).send(errorPresenter.fromMessage('Fields username and/or password are incorrect'))
  }

  const session = businessLogic.createSession(user.id, req.body.username)

  return res.status(201).send(sessionPresenter(session))
}

module.exports = {
  create
}
