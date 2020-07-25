const onChatMessage = require('../../../src/event-handlers/chat-message')
const { createFakeIO } = require('../../mocks')

test('onChatMessage', async () => {
  const createdMessage = { id: 'msg_kajsdflajksdf', user_id: 'usr_lkasjfdklajsf', text: 'hey bro, sup' }
  const fakeCreate = jest.fn().mockReturnValueOnce(Promise.resolve(createdMessage))
  const fakeRepository = {
    Message: {
      create: fakeCreate,
    },
  }
  const fakeIO = createFakeIO()
  const fakeData = {
    text: 'hey bro, sup',
    user_id: 'usr_lkasjfdklajsf',
  }

  await onChatMessage(fakeIO, fakeRepository)(fakeData)

  expect(fakeCreate.mock.calls.length).toBe(1)
  expect(fakeCreate.mock.calls[0][0]).toEqual(expect.objectContaining({
    id: expect.any(String),
    text: fakeData.text,
    user_id: fakeData.user_id,
  }))
  expect(fakeIO.emit.mock.calls.length).toBe(1)
  expect(fakeIO.emit.mock.calls[0]).toEqual([
    'chat-message',
    fakeData,
  ])
})
