const sessionPresenter = require('../../../src/presenters/session')

test('sessionPresenter', () => {
  const inputSession = {
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9ja2QxcG1sNmQwMDAyMDFxbWVnN3lnZWptIiwidXNlcm5hbWUiOiJtYXJhaWEiLCJpYXQiOjE1OTU2ODQ5ODQsImV4cCI6MTU5NjI4OTc4NH0.r5yNGIgli9BeokAl5OLEh4rWzzPRiERc98DhjlrkkHI',
  }

  expect(sessionPresenter(inputSession)).toEqual({
    token: inputSession.token,
  })
})
