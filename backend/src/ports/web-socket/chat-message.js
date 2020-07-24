const onChatMessage = (io, db) => async data => {
  console.log(`user '${data.username}' messaged '${data.text}' on chat`)

  const message = await db.models.Message.create({
    text: data.text,
    user_id: data.user_id,
  })

  console.log('db message', message)
  io.emit('chat-message', data)
}

module.exports = onChatMessage
