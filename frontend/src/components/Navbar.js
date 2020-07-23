import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const location = useLocation()

  return (
    <nav>
      <div className="default-left-padding">
        <h1>Jobsity Chat</h1>
        {
          location.pathname !== '/'
            ?
              <Link to="/">
                Back to home
              </Link>
            :
              <React.Fragment></React.Fragment>
        }
      </div>
    </nav>
  )
}

export default Navbar
