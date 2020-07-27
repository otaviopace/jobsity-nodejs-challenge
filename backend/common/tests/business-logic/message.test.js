const { generateMessageId, createMessage, hasSameUserId } = require('../../src/business-logic/message')

test('generateMessageId', () => {
  const cuid = generateMessageId()
  expect(cuid.startsWith('msg_')).toBe(true)
})

test('createMessage', () => {
  const inputMessage = {
    text: 'hey person',
    user_id: 'usr_jaslkdfjasklfdjaksdfja',
  }

  const message = createMessage(inputMessage)

  expect(message.id.startsWith('msg_')).toBe(true)
  expect(message).toEqual(expect.objectContaining(inputMessage))
})

describe('hasSameUserId', () => {
  test('same', () => {
    const id = 'usr_aklsjdfklasjfd'
    const user = { id }
    const message = { user_id: id }

    expect(hasSameUserId(user, message)).toBe(true)
  })

  test('different', () => {
    const user = { id: 'usr_aklsjdfklasjfd' }
    const message = { user_id: 'usr_anotherid' }

    expect(hasSameUserId(user, message)).toBe(false)
  })
})
