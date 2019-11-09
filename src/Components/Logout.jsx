import React, { Component } from 'react'
import '../index.css'
import { signOutUser } from '../state/actions/reduxTokenAuthConfig'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import { NavLink } from 'react-router-dom'

class Logout extends Component {
  state = {
    errorMessage: ''
  }

  signOut = (e) => {
    e.preventDefault()
    const { signOutUser } = this.props

    signOutUser()
      .then(
        console.log('yiihaaaa')
      )
      .catch(error => {
        this.setState({errorMessage: error.response.data.errors.full_messages[0]}) 
      })
  }

  render() {
    let logoutButton, errorMessage
    const {signOut} = this
    if (this.props.currentUser.isSignedIn) {
        logoutButton = (
          <Menu.Item 
            id="logout-button"
            as={NavLink}
            to="/"
            onClick={signOut}
            name="logout"
          />
        )
      }
    if (this.state.errorMessage !== '') {
      errorMessage = this.state.errorMessage
    }

    return (
      <>
        { logoutButton }
        <p id="error-message">{ errorMessage }</p>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    state: state,
    currentUser: state.reduxTokenAuth.currentUser
  }
}

const mapDispatchToProps = {
  signOutUser
}

export default connect(
  mapStateToProps,  
  mapDispatchToProps
)(Logout)