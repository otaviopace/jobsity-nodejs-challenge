import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const handleSubmit = event =>
  event.preventDefault()

function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmationPassword, setConfirmationPassword] = useState('')

  return (
    <div className="default-left-padding">
      <div>
        <h2>
          Register
        </h2>
        <p>
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </div>
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name: </label>
          <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            id="name"
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
          <label htmlFor="confirmationPassword">Confirm Password: </label>
          <input
            onChange={e => setConfirmationPassword(e.target.value)}
            value={confirmationPassword}
            id="confirmationPassword"
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
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}

export default Register
