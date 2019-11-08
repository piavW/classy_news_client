import React, { Component } from 'react'
import '../index.css';
import SignupForm from './SignupForm';
import { registerUser } from '../state/actions/reduxTokenAuthConfig';
import { connect } from 'react-redux';
import { Button, 
         Container,
         Grid  } from 'semantic-ui-react';
import PaymentForm from './PaymentForm'

class Signup extends Component {
  state = {
    renderSignupForm: false,
    email: '',
    password: '',
    password_confirmation: '',
    nickname: '',
    name: '',
    city: '',
    country: 'Sweden',
    errorMessage: ''
  }

  renderSignup = () => {
    this.setState({
      renderSignupForm: !this.state.renderSignupForm
    })
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignup = () => {
    const { registerUser } = this.props;
    const { email, name, nickname, password, password_confirmation, city, country} = this.state;
    const role = 'user'
    registerUser({ email, name, nickname, password, password_confirmation, city, country, role })
      .then(
        console.log('yiihaaaa')
      )
      .catch(error => {
        this.setState({errorMessage: error.response.data.errors.full_messages[0]}) 
      })
  }
  
  render() {
    let signupForm, welcomeMessage, errorMessage

    if (this.props.currentUser.isSignedIn) {
          signupForm = ( <PaymentForm /> )
    } else {
      if (this.state.renderSignupForm) {
        signupForm = (
          <div>
            <SignupForm
              inputChangeHandler = {this.inputChangeHandler}
              handleSignup={this.handleSignup}
              renderSignup={this.renderSignup}
            />
          </div>
        )
      } else {
        signupForm = (
          <div>
            <Button id="signup-button" onClick={ this.renderSignup }>Sign Up</Button>
          </div>
        )
      }
    }
    if (this.state.errorMessage) {
      errorMessage = <p>{this.state.errorMessage}</p>
    }

    return (
      <Container>
        <Grid centered columns={1}>
          <Grid.Column>
            <div>
              { signupForm }
              { welcomeMessage }
              { errorMessage }
            </div>
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
  registerUser
}

export default connect(
  mapStateToProps,  
  mapDispatchToProps
)(Signup);