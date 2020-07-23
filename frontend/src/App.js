import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import Home from './components/Home'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import Chat from './components/Chat'
import { getLocalSessionToken } from './AuthService'
import './App.css'

const PrivateRoute = ({ component, ...options }) => {
  const sessionToken = getLocalSessionToken()
  const finalComponent = sessionToken ? component : () => (<Redirect from="/chat" to="/"/>)

  return <Route {...options} component={finalComponent} />
}

const App = () =>
  <Router>
    <Home />
    <Route exact path="/" component={Landing} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/login" component={Login} />
    <PrivateRoute exact path="/chat" component={Chat} />
  </Router>

export default App
