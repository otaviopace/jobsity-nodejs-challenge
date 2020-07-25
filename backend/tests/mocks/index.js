const createFakeIO = () => ({
  emit: jest.fn(),
})

const createFakeSequelizeModel = () => ({
  create: jest.fn().mockReturnValueOnce(Promise.resolve()),
  findOne: jest.fn().mockReturnValueOnce(Promise.resolve()),
  findAll: jest.fn().mockReturnValueOnce(Promise.resolve()),
  update: jest.fn().mockReturnValueOnce(Promise.resolve()),
  destroy: jest.fn().mockReturnValueOnce(Promise.resolve()),
})

module.exports = {
  createFakeIO,
  createFakeSequelizeModel,
}
