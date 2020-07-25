const cuidWithPrefix = require('./cuid')

const generateMessageId = cuidWithPrefix('msg_')

const createMessage = inputMessage => ({
  id: generateMessageId(),
  text: inputMessage.text,
  user_id: inputMessage.user_id,
})

const hasSameUserId = (user, message) =>
  user.id === message.user_id

module.exports = {
  createMessage,
  hasSameUserId,
}
