const { generateUserId, generateHash, createUser } = require('../../../src/business-logic/user')

test('generateUserId', () => {
  const cuid = generateUserId()
  expect(cuid.startsWith('usr_')).toBe(true)
})

test('createUser', async () => {
  const user = await createUser('coolguy183', '12345')

  expect(user.id.startsWith('usr_')).toBe(true)
  expect(user).toEqual(expect.objectContaining({
    username: 'coolguy183'
  }))
})

test('generateHash', async () => {
  const hash = await generateHash('12345')

  expect(typeof hash).toEqual('string')
  expect(hash.length).toEqual(60)
})
