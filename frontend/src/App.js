import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Register from './components/Register'
import Login from './components/Login'
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
    </Router>
  )
}

export default App;
