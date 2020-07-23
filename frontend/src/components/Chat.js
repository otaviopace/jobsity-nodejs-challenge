import React, { useState, useEffect } from 'react'

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState('')

  useEffect(() => {
    socket.on('chat-message', msg => {
      setMessages([...messages, msg])
    })
  }, [socket, messages])

  const handleSubmit = event => {
    event.preventDefault()

    if (message !== '') {
      socket.emit('chat-message', message)
      setMessage('')
    }
  }

  return (
    <div className="default-left-padding">
      <ul id="messages">
        {
          messages.map((msg, idx) => <li key={idx}>{msg}</li>)
        }
      </ul>
      <form className="messages-form" onSubmit={handleSubmit}>
        <input
          onChange={e => setMessage(e.target.value)}
          value={message}
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
