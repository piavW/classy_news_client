import React, { Component } from 'react'
import '../index.css';
import SignupForm from './SignupForm';
import { registerUser } from '../state/actions/reduxTokenAuthConfig';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { Button, 
         Container,
         Grid  } from 'semantic-ui-react';

class Signup extends Component {
  state = {
    email: '',
    password: '',
    password_confirmation: '',
    nickname: '',
    name: '',
    city: '',
    country: 'Sweden',
    errorMessage: ''
  }

  inputChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSignup = () => {
    const { registerUser } = this.props
    const { email, name, nickname, password, password_confirmation, city, country} = this.state
    const role = 'user'
    registerUser({ email, name, nickname, password, password_confirmation, city, country, role })
      .then(
        console.log('yiihaaaa')
      )
      .catch(error => {
        if (error.response.status === 500) {
          this.setState({errorMessage: 'Must submit valid credentials to sign up.'})
        } else {
        this.setState({errorMessage: error.response.data.errors.full_messages[0]}) 
        }
      })
    }
  
  render() {
    let signupForm, errorMessage

    if (this.props.currentUser.isSignedIn) {
          signupForm = (
            <p id='welcome-message'>{t('signup.hello')} {this.props.currentUser.attributes.name}</p>
          )
    } else {
      signupForm = (
        <div>
          <SignupForm
            inputChangeHandler = {this.inputChangeHandler}
            handleSignup ={this.handleSignup}
          />
        </div>
      )
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

export default withTranslation()
connect(
  mapStateToProps,  
  mapDispatchToProps
)(Signup)