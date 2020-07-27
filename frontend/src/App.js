import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import socketIO from 'socket.io-client'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import Chat from './components/Chat'
import { getLocalSessionToken, WEB_SOCKET_URL } from './AuthService'
import './App.css'

const PrivateRoute = ({ socket, component, ...options }) => {
  const sessionToken = getLocalSessionToken()
  const finalComponent = sessionToken ? () => component({socket}) : () => (<Redirect from="/chat" to="/"/>)

  return <Route {...options} component={finalComponent} />
}

const App = () => {
  const socket = socketIO(WEB_SOCKET_URL)

  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute exact path="/chat" component={Chat} socket={socket}/>
    </Router>
  )
}

export default App
