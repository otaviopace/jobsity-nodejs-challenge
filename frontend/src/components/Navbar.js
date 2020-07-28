import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getLocalSessionToken, logout } from '../LocalStorage'

const Navbar = () => {
  const location = useLocation()

  return (
    <nav>
      <div className='default-left-padding'>
        <h1>Jobsity Chat</h1>
        {
          location.pathname !== '/'
            ? <Link to='/'>Home</Link>
            : <></>
        }
        <br />
        {
          getLocalSessionToken()
            ? (
              <>
                <div>
                  <a href='/' onClick={logout}>
                      Log Out
                  </a>
                </div>
                {(location.pathname !== '/chat' &&
                  <div>
                    <Link to='/chat'>
                      Chat
                    </Link>
                  </div>
                )}
              </>
            )
            : (
              <>
                {(location.pathname !== '/register' &&
                  <div>
                    <Link
                      to='/register'
                      style={{
                        width: '140px',
                        borderRadius: '3px',
                        letterSpacing: '1.5px'
                      }}
                    >
                        Register
                    </Link>
                  </div>
                )}
                {(location.pathname !== '/login' &&
                  <div>
                    <Link
                      to='/login'
                      style={{
                        width: '140px',
                        borderRadius: '3px',
                        letterSpacing: '1.5px'
                      }}
                    >
                        Log In
                    </Link>
                  </div>
                )}
              </>
            )
        }
      </div>
    </nav>
  )
}

export default Navbar
