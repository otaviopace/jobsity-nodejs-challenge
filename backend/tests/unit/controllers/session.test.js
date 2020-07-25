const bcrypt = require('bcryptjs')
const sessionController = require('../../../src/controllers/session')

describe('create', () => {
  test('with NO user existing', async () => {
    const fakeFindOne = jest.fn().mockReturnValueOnce(Promise.resolve(null))
    const fakeRepository = {
      User: {
        findOne: fakeFindOne,
      },
    }
    const fakeSend = jest.fn()
    const fakeBody = { username: 'john', password: '1234' }
    const fakeReq = { body: fakeBody }
    const fakeRes = {
      status: statusCode => {
        expect(statusCode).toBe(401)
        return {
          send: fakeSend,
        }
      },
    }

    await sessionController.create(fakeRepository)(fakeReq, fakeRes)

    expect(fakeFindOne.mock.calls.length).toBe(1)
    expect(fakeSend.mock.calls.length).toBe(1)
    expect(fakeSend.mock.calls[0][0]).toEqual({
      errors: [{ message: 'Fields username and/or password are incorrect' }],
    })
  })

  describe('with existing user', () => {
    test('when password is NOT correct', async () => {
      const password = '12345'
      const salt = await bcrypt.genSalt(10)
      const password_hash = await bcrypt.hash(password, salt)
      const existingUser = { username: 'john', password_hash }
      const fakeFindOne = jest.fn().mockReturnValueOnce(Promise.resolve(existingUser))
      const fakeRepository = {
        User: {
          findOne: fakeFindOne,
        },
      }
      const fakeSend = jest.fn()
      const fakeBody = { username: 'john', password: 'different password' }
      const fakeReq = { body: fakeBody }
      const fakeRes = {
        status: statusCode => {
          expect(statusCode).toBe(401)
          return {
            send: fakeSend,
          }
        },
      }

      await sessionController.create(fakeRepository)(fakeReq, fakeRes)

      expect(fakeFindOne.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls[0][0]).toEqual({
        errors: [{ message: 'Fields username and/or password are incorrect' }],
      })
    })

    test('when password is correct', async () => {
      const password = '12345'
      const salt = await bcrypt.genSalt(10)
      const password_hash = await bcrypt.hash(password, salt)
      const existingUser = { username: 'john', password_hash }
      const fakeFindOne = jest.fn().mockReturnValueOnce(Promise.resolve(existingUser))
      const fakeRepository = {
        User: {
          findOne: fakeFindOne,
        },
      }
      const fakeSend = jest.fn()
      const fakeBody = { username: 'john', password: '12345' }
      const fakeReq = { body: fakeBody }
      const fakeRes = {
        status: statusCode => {
          expect(statusCode).toBe(201)
          return {
            send: fakeSend,
          }
        },
      }

      await sessionController.create(fakeRepository)(fakeReq, fakeRes)

      expect(fakeFindOne.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls.length).toBe(1)
      expect(fakeSend.mock.calls[0][0]).toEqual(expect.objectContaining({
        token: expect.any(String),
      }))
    })
  })
})

