const { emitError, catchSyncError, catchAsyncError } = require('../../../src/event-handlers/catch-error')
const { createFakeIO } = require('../../mocks')

test('emitError', () => {
  const fakeIO = createFakeIO()

  emitError(fakeIO)

  expect(fakeIO.emit.mock.calls.length).toBe(1)
  expect(fakeIO.emit.mock.calls[0][0]).toEqual('error')
  expect(fakeIO.emit.mock.calls[0][1]).toEqual('Internal server error')
})

describe('catchSyncError', () => {
  test('when error does occur', () => {
    const fakeIO = createFakeIO()
    const fakeEventHandler = jest.fn()
      .mockImplementation(() => {
        throw new Error('bad stuff')
      })
    const fakeArgs = [1, 2, 3]

    catchSyncError(fakeIO, fakeEventHandler)(...fakeArgs)

    expect(fakeEventHandler.mock.calls.length).toBe(1)
    expect(fakeEventHandler.mock.calls[0]).toEqual(fakeArgs)

    expect(fakeIO.emit.mock.calls.length).toBe(1)
    expect(fakeIO.emit.mock.calls[0][0]).toEqual('error')
    expect(fakeIO.emit.mock.calls[0][1]).toEqual('Internal server error')
  })

  test('when error does NOT occur', () => {
    const fakeIO = createFakeIO()
    const fakeEventHandler = jest.fn()
    const fakeArgs = [1, 2, 3]

    catchSyncError(fakeIO, fakeEventHandler)(...fakeArgs)

    expect(fakeEventHandler.mock.calls.length).toBe(1)
    expect(fakeEventHandler.mock.calls[0]).toEqual(fakeArgs)
  })
})

describe('catchAsyncError', () => {
  test('when error does occur', async () => {
    const fakeIO = createFakeIO()
    const fakeEventHandler = jest.fn()
      .mockReturnValueOnce(Promise.reject(new Error('bad stuff')))
    const fakeArgs = [1, 2, 3]

    await catchAsyncError(fakeIO, fakeEventHandler)(...fakeArgs)

    expect(fakeEventHandler.mock.calls.length).toBe(1)
    expect(fakeEventHandler.mock.calls[0]).toEqual(fakeArgs)

    expect(fakeIO.emit.mock.calls.length).toBe(1)
    expect(fakeIO.emit.mock.calls[0][0]).toEqual('error')
    expect(fakeIO.emit.mock.calls[0][1]).toEqual('Internal server error')
  })

  test('when error does NOT occur', async () => {
    const fakeIO = createFakeIO()
    const fakeEventHandler = jest.fn()
      .mockReturnValueOnce(Promise.resolve())
    const fakeArgs = [1, 2, 3]

    await catchAsyncError(fakeIO, fakeEventHandler)(...fakeArgs)

    expect(fakeEventHandler.mock.calls.length).toBe(1)
    expect(fakeEventHandler.mock.calls[0]).toEqual(fakeArgs)
  })
})
