import React from 'react'

function Chat() {
  return (
    <div className="default-left-padding">
      <ul id="messages"></ul>
      <form className="messages-form" action="">
        <input className="messages-input" id="m" autoComplete="off" />
        <button className="messages-button">Send</button>
      </form>
    </div>
  )
}

export default Chat
