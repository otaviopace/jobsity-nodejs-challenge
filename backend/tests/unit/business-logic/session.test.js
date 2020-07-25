const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { areTheSamePassword, createSession, decodeSession } = require('../../../src/business-logic/session')

describe('areTheSamePassword', () => {
  test('same', async () => {
    const password = '12345'
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    expect(await areTheSamePassword(password, hash)).toBe(true)
  })

  test('different', async () => {
    const password = '12345'
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    expect(await areTheSamePassword('ANOTHER PASSWORD', hash)).toBe(false)
  })
})

test('createSession', async () => {
  const userId = 'usr_kajsdflkajsdfklj'
  const username = 'cooooooldude11444'

  const session = await createSession(userId, username)

  const decodedSession = jwt.verify(session.token, process.env.JWT_SECRET)

  expect(session.token.length).toBe(207)
  expect(decodedSession).toEqual(expect.objectContaining({
    id: userId,
    username,
  }))
})

test('decodeSession', () => {
  const decodedSession = {
    userId: 'usr_kajsdflkajsdfklj',
    username: 'cooooooldude11444',
  }
  const token = jwt.sign(
    decodedSession,
    process.env.JWT_SECRET,
    { expiresIn: 604800 }
  )

  expect(decodeSession(token)).toEqual(expect.objectContaining(decodedSession))
})
