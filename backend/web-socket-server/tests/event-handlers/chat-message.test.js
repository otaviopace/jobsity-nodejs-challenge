const onChatMessage = require('../../src/event-handlers/chat-message')
const { createFakeIO } = require('../mocks')

describe('onChatMessage', () => {
  test('when it is a regular message', async () => {
    const createdMessage = { id: 'msg_kajsdflajksdf', user_id: 'usr_lkasjfdklajsf', text: 'hey bro, sup' }
    const fakeCreate = jest.fn().mockReturnValueOnce(Promise.resolve(createdMessage))
    const fakeRepository = {
      Message: {
        create: fakeCreate,
      },
    }
    const fakeIO = createFakeIO()
    const fakeData = {
      id: 'msg_kajsdflajksdf',
      text: 'hey bro, sup',
      user_id: 'usr_lkasjfdklajsf',
    }

    const fakeMsgBroker = {
      sendToQueue: jest.fn().mockReturnValueOnce(Promise.resolve()),
    }

    await onChatMessage(fakeIO, fakeRepository, fakeMsgBroker)(fakeData)

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
    expect(fakeMsgBroker.sendToQueue.mock.calls.length).toBe(0)
  })

  test('when it is command', async () => {
    const fakeCreate = jest.fn()
    const fakeRepository = {
      Message: {
        create: fakeCreate,
      },
    }
    const fakeIO = createFakeIO()
    const fakeData = {
      id: 'msg_kajsdflajksdf',
      text: '/stock=aapl.us',
      user_id: 'usr_lkasjfdklajsf',
    }

    const fakeMsgBroker = {
      sendToQueue: jest.fn().mockReturnValueOnce(Promise.resolve()),
    }

    await onChatMessage(fakeIO, fakeRepository, fakeMsgBroker)(fakeData)

    expect(fakeCreate.mock.calls.length).toBe(0)
    expect(fakeIO.emit.mock.calls.length).toBe(0)
    expect(fakeMsgBroker.sendToQueue.mock.calls.length).toBe(1)
    expect(fakeMsgBroker.sendToQueue.mock.calls[0]).toEqual([
      'commands',
      { type: 'stock', parameters: { stock_code: "aapl.us" } },
    ])
  })
})
