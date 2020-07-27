const authenticationMiddleware = require('../../src/middlewares/authentication')

describe('authenticationMiddleware', () => {
  describe('error', () => {
    test('when authentication header is missing', () => {
      const fakeNext = jest.fn()
      const fakeGetHeader = jest.fn()
        .mockImplementation((headerName) => {
          if (headerName !== 'Authorization') {
            throw new Error('only Authorization header should be read on request')
          }

          return undefined
        })
      const fakeReq = { get: fakeGetHeader }
      const fakeSend = jest.fn()
      const fakeRes = {
        status: statusCode => {
          expect(statusCode).toBe(401)
          return {
            send: fakeSend,
          }
        },
      }

      authenticationMiddleware(fakeReq, fakeRes, fakeNext)

      expect(fakeSend.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls[0][0]).toEqual({
        errors: [{ message: 'Authorization header is missing' }],
      })
      expect(fakeNext.mock.calls.length).toBe(0)
    })
    test('when Bearer prefix on header is missing', () => {
      const fakeNext = jest.fn()
      const fakeGetHeader = jest.fn()
        .mockImplementation((headerName) => {
          if (headerName !== 'Authorization') {
            throw new Error('only Authorization header should be read on request')
          }

          return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9ja2QxcG1sNmQwMDAyMDFxbWVnN3lnZWptIiwidXNlcm5hbWUiOiJtYXJhaWEiLCJpYXQiOjE1OTU2ODQ5ODQsImV4cCI6MTU5NjI4OTc4NH0.r5yNGIgli9BeokAl5OLEh4rWzzPRiERc98DhjlrkkHI'
        })
      const fakeReq = { get: fakeGetHeader }
      const fakeSend = jest.fn()
      const fakeRes = {
        status: statusCode => {
          expect(statusCode).toBe(401)
          return {
            send: fakeSend,
          }
        },
      }

      authenticationMiddleware(fakeReq, fakeRes, fakeNext)

      expect(fakeSend.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls[0][0]).toEqual({
        errors: [{ message: '\'Bearer\' prefix missing on Authorization header' }],
      })
      expect(fakeNext.mock.calls.length).toBe(0)
    })
    test('when token on header is NOT valid', () => {
      const fakeNext = jest.fn()
      const fakeGetHeader = jest.fn()
        .mockImplementation((headerName) => {
          if (headerName !== 'Authorization') {
            throw new Error('only Authorization header should be read on request')
          }

          return 'Bearer invalidtoken'
        })
      const fakeReq = { get: fakeGetHeader }
      const fakeSend = jest.fn()
      const fakeRes = {
        status: statusCode => {
          expect(statusCode).toBe(401)
          return {
            send: fakeSend,
          }
        },
      }

      authenticationMiddleware(fakeReq, fakeRes, fakeNext)

      expect(fakeSend.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls[0][0]).toEqual({
        errors: [{ message: 'Invalid token on Authorization header' }],
      })
      expect(fakeNext.mock.calls.length).toBe(0)
    })
  })

  describe('success', () => {
    test('when token on header is valid', () => {
      const fakeNext = jest.fn()
      const fakeGetHeader = jest.fn()
        .mockImplementation((headerName) => {
          if (headerName !== 'Authorization') {
            throw new Error('only Authorization header should be read on request')
          }

          return 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InVzcl9ja2QxcG1sNmQwMDAyMDFxbWVnN3lnZWptIiwidXNlcm5hbWUiOiJtYXJhaWEiLCJpYXQiOjE1OTU2ODQ5ODQsImV4cCI6MTU5NjI4OTc4NH0.r5yNGIgli9BeokAl5OLEh4rWzzPRiERc98DhjlrkkHI'
        })
      const fakeReq = { get: fakeGetHeader }
      const fakeRes = {
        status: jest.fn(),
      }

      authenticationMiddleware(fakeReq, fakeRes, fakeNext)

      expect(fakeRes.status.mock.calls.length).toBe(0)
      expect(fakeNext.mock.calls.length).toBe(1)
      expect(fakeNext.mock.calls[0][0]).toBe(undefined)
    })
  })
})
