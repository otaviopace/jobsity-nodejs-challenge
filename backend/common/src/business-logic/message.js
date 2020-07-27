const cuidWithPrefix = require('./cuid')

const generateMessageId = cuidWithPrefix('msg_')

const createMessage = inputMessage => ({
  id: generateMessageId(),
  text: inputMessage.text,
  user_id: inputMessage.user_id,
  username: inputMessage.username,
})

const hasSameUserId = (user, message) =>
  user.id === message.user_id

const isCommand = message =>
  message.text.startsWith('/')

module.exports = {
  generateMessageId,
  createMessage,
  hasSameUserId,
  isCommand,
}
