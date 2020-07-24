const onChatMessage = (io, repository) => async data => {
  console.log(`user '${data.username}' messaged '${data.text}' on chat`)

  const message = await repository.Message.create({
    text: data.text,
    user_id: data.user_id,
  })

  console.log('repository message', message)
  io.emit('chat-message', data)
}

module.exports = onChatMessage
