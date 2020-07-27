const userPresenter = require('../../src/presenters/user')

test('userPresenter', () => {
  const inputUser = {
    id: 'usr_aksjdflkjasdflk',
    username: 'noicejude444',
    created_at: new Date(),
    updated_at: new Date(),
    deleted_at: null,
  }

  expect(userPresenter(inputUser)).toEqual({
    id: inputUser.id,
    username: inputUser.username,
  })
})
