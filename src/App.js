import React from 'react'
import ListArticles from './Components/ListArticles'
import Signup from './Components/Signup'
import Login from './Components/Login'
import './index.css';
import CreateArticle from './Components/CreateArticle'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom' 
import { Redirect } from 'react-router-dom'
import NavBar from './Components/NavBar'
import { connect } from 'react-redux';

const App = ({ currentUser }) => {
  return (
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route path='/signup' component={Signup} />
          <Route path='/login' component={Login} />
          <Route exact path='/' component={ListArticles} />
          {currentUser.attributes.role === 'journalist' ? (
            <Route exact path='/create-article' component={CreateArticle} />
          ) : (
            <Redirect to='/' />
          )}
        </Switch>
      </>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

export default connect(
  mapStateToProps, 
  null
  )(App)