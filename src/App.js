import React, { Suspense } from 'react'
import ListArticles from './Components/ListArticles'
import Signup from './Components/Signup'
import Login from './Components/Login'
import './index.css'
import CreateArticle from './Components/CreateArticle'
import { Router, Route, Switch } from 'react-router-dom' 
import { Redirect } from 'react-router-dom'
import NavBar from './Components/NavBar'
import { connect } from 'react-redux'
import PaymentForm from './Components/PaymentForm'
import ViewArticle from './Components/ViewArticle'
import { createBrowserHistory } from 'history'
import { generateRequireSignInWrapper } from 'redux-token-auth'
import { Header, Image } from 'semantic-ui-react'
import myImage from './RB.png'
import Logout from './Components/Logout'

const requireSignIn = generateRequireSignInWrapper({
  redirectPathIfNotSignedIn: '/login'
})
const history = createBrowserHistory({})

const App = ({ currentUser }) => {
  return (
    <>
      <center><Header as='h1' id="header-title">
        Classy
        <Image src={myImage} size='large'
        />
        News
      </Header></center>
            
      <Router history ={history}>
        <>
          <NavBar />
          <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/' component={ListArticles} />
            <Route exact path='/subscribe' component={requireSignIn(PaymentForm)} />
            {currentUser.isSignedIn ? (
              <Route exact path='/' component={ListArticles} />
            ) : (
              <Redirect to='/login' />
            )} 
            <Route exact path='/' component={Logout} />
            {currentUser.attributes.role === 'subscriber' || 'journalist' ? (
              <Route exact path='/article/:id' component={ViewArticle} />
            ) : (
              <Redirect to='/subscribe' /> 
            )}
            {currentUser.attributes.role === 'journalist' ? (
              <Route exact path='/create-article' component={CreateArticle} />
            ) : (
              <Redirect to='/' />
            )}
          </Switch>
        </>
      </Router>
      </>
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
