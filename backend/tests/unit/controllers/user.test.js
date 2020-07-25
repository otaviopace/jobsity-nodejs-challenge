const userController = require('../../../src/controllers/user')

describe('create', () => {
  test('with existing user', async () => {
    const existingUser = { username: 'john' }
    const fakeFindOne = jest.fn().mockReturnValueOnce(Promise.resolve(existingUser))
    const fakeCreate = jest.fn()
    const fakeRepository = {
      User: {
        findOne: fakeFindOne,
        create: fakeCreate,
      },
    }
    const fakeSend = jest.fn()
    const fakeBody = { username: 'john', password: '1234' }
    const fakeReq = { body: fakeBody }
    const fakeRes = {
      status: statusCode => {
        expect(statusCode).toBe(400)
        return {
          send: fakeSend,
        }
      },
    }

    await userController.create(fakeRepository)(fakeReq, fakeRes)

    expect(fakeFindOne.mock.calls.length).toBe(1)
    expect(fakeCreate.mock.calls.length).toBe(0)
    expect(fakeSend.mock.calls.length).toBe(1)
    expect(fakeSend.mock.calls[0][0]).toEqual({
      errors: [{ message: 'An User with this username already exists' }],
    })
  })

  test('with NO user existing', async () => {
    const createdUser = { id: 'usr_lkasjfdklajsf', username: 'john' }
    const fakeFindOne = jest.fn().mockReturnValueOnce(Promise.resolve(null))
    const fakeCreate = jest.fn().mockReturnValueOnce(Promise.resolve(createdUser))
    const fakeRepository = {
      User: {
        findOne: fakeFindOne,
        create: fakeCreate,
      },
    }
    const fakeSend = jest.fn()
    const fakeBody = { username: 'john', password: '1234' }
    const fakeReq = { body: fakeBody }
    const fakeRes = {
      status: statusCode => {
        expect(statusCode).toBe(201)
        return {
          send: fakeSend,
        }
      },
    }

    await userController.create(fakeRepository)(fakeReq, fakeRes)

    expect(fakeFindOne.mock.calls.length).toBe(1)
    expect(fakeCreate.mock.calls.length).toBe(1)
    expect(fakeCreate.mock.calls[0][0]).toEqual(expect.objectContaining({
      id: expect.any(String),
      username: createdUser.username,
      password_hash: expect.any(String),
    }))
    expect(fakeSend.mock.calls.length).toBe(1)
    expect(fakeSend.mock.calls[0][0]).toEqual(expect.objectContaining(createdUser))
  })
})
