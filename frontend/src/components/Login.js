import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const handleSubmit = event =>
  event.preventDefault()

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="default-left-padding">
      <div>
        <h2>Log In</h2>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username: </label>
          <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            id="username"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            id="password"
            type="password"
          />
        </div>
        <div>
          <button
            style={{
              width: "150px",
              borderRadius: "3px",
              letterSpacing: "1.5px",
              marginTop: "1rem"
            }}
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
