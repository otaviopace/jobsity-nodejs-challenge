const authenticationMiddleware = require('../../../src/event-handlers/authentication')

describe('authenticationMiddleware', () => {
  test('when event is NOT to be authenticated', () => {
    const fakeNext = jest.fn()

    const eventsWithAuthentication = [
      'chat-message',
      'friend-solicitation',
    ]

    authenticationMiddleware(eventsWithAuthentication)(['another-event-name'], fakeNext)

    expect(fakeNext.mock.calls.length).toBe(1)
    expect(fakeNext.mock.calls[0][0]).toEqual(undefined)
  })

  describe('when event is to be authenticated', () => {
    test('when session or message are empty', () => {
      const fakeNext = jest.fn()
      const eventsWithAuthentication = ['chat-message']

      authenticationMiddleware(eventsWithAuthentication)(['chat-message'], fakeNext)

      expect(fakeNext.mock.calls.length).toBe(1)
      expect(fakeNext.mock.calls[0][0]).toEqual(new Error('Authentication failed'))
    })

    test('when session and message users are NOT the same', () => {
      const fakeNext = jest.fn()
      const eventsWithAuthentication = ['chat-message']
      const message = { user_id: 'usr_alskjdfklajsdfklasjdflk', username: 'joseph' }
      const session = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9ja2QxcG1sNmQwMDAyMDFxbWVnN3lnZWptIiwidXNlcm5hbWUiOiJtYXJhaWEiLCJpYXQiOjE1OTU2ODQ5ODQsImV4cCI6MTU5NjI4OTc4NH0.r5yNGIgli9BeokAl5OLEh4rWzzPRiERc98DhjlrkkHI' }

      authenticationMiddleware(eventsWithAuthentication)(['chat-message', message, session], fakeNext)

      expect(fakeNext.mock.calls.length).toBe(1)
      expect(fakeNext.mock.calls[0][0]).toEqual(new Error('Authentication failed'))
    })

    test('when session and message users are the same', () => {
      const fakeNext = jest.fn()
      const eventsWithAuthentication = ['chat-message']
      const message = { user_id: 'usr_ckd1pml6d000201qmeg7ygejm', username: 'maraia' }
      const session = { token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9ja2QxcG1sNmQwMDAyMDFxbWVnN3lnZWptIiwidXNlcm5hbWUiOiJtYXJhaWEiLCJpYXQiOjE1OTU2ODQ5ODQsImV4cCI6MTU5NjI4OTc4NH0.r5yNGIgli9BeokAl5OLEh4rWzzPRiERc98DhjlrkkHI' }

      authenticationMiddleware(eventsWithAuthentication)(['chat-message', message, session], fakeNext)

      expect(fakeNext.mock.calls.length).toBe(1)
      expect(fakeNext.mock.calls[0][0]).toEqual(undefined)
    })
  })
})
