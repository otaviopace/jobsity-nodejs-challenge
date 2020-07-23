import React, { useState, useEffect } from 'react'
import { getLocalUsername } from '../AuthService'

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    socket.on('chat-message', msgData => {
      setMessages([...messages, msgData])
    })
  }, [socket, messages])

  const handleSubmit = event => {
    event.preventDefault()

    const username = getLocalUsername()

    if (messageText !== '') {
      socket.emit('chat-message', {username, text: messageText})
      setMessageText('')
    }
  }

  return (
    <div className="default-left-padding">
      <ul id="messages">
        {
          messages.map(({ text, username }, idx) => <li key={idx}>{username}: {text}</li>)
        }
      </ul>
      <form className="messages-form" onSubmit={handleSubmit}>
        <input
          onChange={e => setMessageText(e.target.value)}
          value={messageText}
          className="messages-input"
          id="m"
          autoComplete="off"
        />
        <button className="messages-button">Send</button>
      </form>
    </div>
  )
}

export default Chat
