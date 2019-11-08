import React, { Component } from 'react'
import '../index.css';
import LoginForm from './LoginForm';
import { signInUser } from '../state/actions/reduxTokenAuthConfig';
import { connect } from 'react-redux';
import { Button, 
         Container,
         Grid  } from 'semantic-ui-react';

class Login extends Component {
  state = {
    renderLoginForm: false,
    email: '',
    password: '',
    errorMessage: ''
  }

  renderLogin = () => {
    this.setState({
      renderLoginForm: !this.state.renderLoginForm
    })
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLogin = () => {
    const { signInUser } = this.props;
    const { email, password } = this.state;
    signInUser({ email, password })
      .then(
        console.log('yiihaaaa')
      )
      .catch(error => {
        this.setState({errorMessage: error.response.data.errors.full_messages[0]}) 
      })
  }

  render() {
    let loginForm, welcomeMessage, errorMessage

    if (this.props.currentUser.isSignedIn) {
      welcomeMessage = <p id="welcome-message">Hello {this.props.currentUser.attributes.name}</p> 
    } else {
      if (this.state.renderLoginForm) {
        loginForm = (
          <div>
            <LoginForm
              inputChangeHandler = {this.inputChangeHandler}
              handleLogin={this.handleLogin}
              renderLogin={this.renderLogin}
            />
          </div>
        )
      } else {
        loginForm = (
          <div>
            <Button id="login-button" onClick={ this.renderLogin }>Login</Button>
          </div>
        )
      }
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
            <p id="error-message">{ errorMessage }</p>
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

export default connect(
  mapStateToProps,  
  mapDispatchToProps
)(Login);