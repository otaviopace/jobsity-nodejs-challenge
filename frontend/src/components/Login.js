import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import { createSession } from '../ApiService'

const Login = ({ history }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    setErrorMsg('')

    return createSession({ username, password })
      .then(() => history.push('/chat'))
      .catch(error => setErrorMsg(error.message))
  }

  return (
    <div className='default-left-padding'>
      <div>
        <h2>Log In</h2>
        <p>
          Don't have an account? <Link to='/register'>Register</Link>
        </p>
      </div>
      {errorMsg ? (<span style={{ backgroundColor: 'hsl(14, 100%, 53%)' }}>{errorMsg}</span>) : null}
      <form noValidate onSubmit={handleSubmit}>
        <div>
          <label htmlFor='username'>Username: </label>
          <input
            onChange={e => setUsername(e.target.value)}
            value={username}
            id='username'
            type='text'
          />
        </div>
        <div>
          <label htmlFor='password'>Password: </label>
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            id='password'
            type='password'
          />
        </div>
        <div>
          <button
            style={{
              width: '150px',
              borderRadius: '3px',
              letterSpacing: '1.5px',
              marginTop: '1rem'
            }}
            type='submit'
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default withRouter(Login)
