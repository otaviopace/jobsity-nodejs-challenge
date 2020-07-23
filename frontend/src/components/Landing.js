import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className="default-left-padding">
      <div>
        <Link
          to="/register"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px"
          }}
        >
          Register
        </Link>
      </div>
      <div>
        <Link
          to="/login"
          style={{
            width: "140px",
            borderRadius: "3px",
            letterSpacing: "1.5px"
          }}
        >
          Log In
        </Link>
      </div>
    </div>
  )
}

export default Landing
