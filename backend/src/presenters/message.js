const messagePresenter = inputMessage => ({
  id: inputMessage.id,
  text: inputMessage.text,
  user_id: inputMessage.user_id,
  username: inputMessage.username,
})

module.exports = messagePresenter
