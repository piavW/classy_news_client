import React, { Component } from 'react'
import '../index.css';
import LoginForm from './LoginForm';
import { signInUser } from '../state/actions/reduxTokenAuthConfig';
import { connect } from 'react-redux';
import { Button, 
         Container,
         Grid  } from 'semantic-ui-react';
import { withTranslation } from 'react-i18next';

class Login extends Component {
  state = {
    email: '',
    password: '',
    errorMessage: ''
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = () => {
    const { signInUser } = this.props
    const { email, password } = this.state
    signInUser({ email, password })
      .then(
        console.log('yiihaaaa')
      )
      .catch(error => {
        this.setState({errorMessage: error.response.data.errors }) 
      })
  }

  render() {
    let loginForm, welcomeMessage, errorMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <p id="welcome-message">{t('login.hello')} {this.props.currentUser.attributes.name}</p> 
    } else {
      loginForm = (
        <div>
          <LoginForm
            inputChangeHandler = {this.inputChangeHandler}
            handleLogin={this.handleLogin}
          />
        </div>
      )
    }
    if (this.state.errorMessage !== '') {
      errorMessage = this.state.errorMessage
    }

    return (
      <Container>
        <Grid centered columns={1}>
          <Grid.Column>
            <div>
              { loginForm }
              { welcomeMessage }
            </div>
            { errorMessage }
          </Grid.Column>
        </Grid>   
      </Container>  
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  signInUser
}

export default withTranslation() 
connect(
  mapStateToProps,  
  mapDispatchToProps
)(Login)