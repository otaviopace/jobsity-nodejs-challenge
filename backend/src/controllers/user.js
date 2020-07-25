const businessLogic = require('../business-logic/user')
const userPresenter = require('../presenters/user')
const errorPresenter = require('../presenters/error')

const create = repository => async (req, res) => {
  const existingUser = await repository.User.findOne({
    where: {
      username: req.body.username,
    },
  })

  if (existingUser) {
    return res.status(400).send(errorPresenter.fromMessage('An User with this username already exists'))
  }

  const user = await businessLogic.createUser(
    req.body.username,
    req.body.password
  )

  const repositoryUser = await repository.User.create(user)

  return res.status(201).send(userPresenter(repositoryUser))
}

module.exports = {
  create,
}
