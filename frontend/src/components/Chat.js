import React, { useState, useEffect } from 'react'
import { getLocalUsername, getLocalId, getLocalSessionToken } from '../LocalStorage'
import { getLastMessages } from '../ApiService'

const Chat = ({ socket }) => {
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    getLastMessages()
      .then((msgs) => setMessages(msgs.reverse().slice(-50)))
      .catch(error => setErrorMsg(error.message))
  }, [])

  useEffect(() => {
    socket.on('chat-message', msgData => {
      if (messages.length >= 50) {
        setMessages([...messages.slice(1), msgData])
        return
      }
      setMessages([...messages, msgData])
    })

    socket.on('error', error => {
      setErrorMsg(error)
    })
  }, [socket, messages])

  const handleSubmit = event => {
    event.preventDefault()
    setErrorMsg('')

    const username = getLocalUsername()
    const id = getLocalId()
    const token = getLocalSessionToken()

    if (messageText !== '') {
      socket.emit(
        'chat-message',
        { user_id: id, username, text: messageText },
        { token }
      )
      setMessageText('')
    }
  }

  return (
    <div className='default-left-padding'>
      {errorMsg ? (<span style={{ backgroundColor: 'hsl(14, 100%, 53%)' }}>{errorMsg}</span>) : null}
      <ul id='messages'>
        {
          messages.map(({ text, username }, idx) => <li key={idx}>{username}: {text}</li>)
        }
      </ul>
      <form className='messages-form' onSubmit={handleSubmit}>
        <input
          onChange={e => setMessageText(e.target.value)}
          value={messageText}
          className='messages-input'
          id='m'
          autoComplete='off'
        />
        <button className='messages-button'>Send</button>
      </form>
    </div>
  )
}

export default Chat
