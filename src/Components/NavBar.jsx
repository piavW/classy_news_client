import React from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { Menu } from 'semantic-ui-react'
import myImage from '../logo.png'
import Logout from './Logout'

 const NavBar = ({ currentUser }) => {
  return (
    <Menu className="navbar">
      <Menu.Item
        as={NavLink} 
        to="/" 
        id="navbar-home"
        >
        <img src={myImage} alt="Logo" id='navbar-home-image' display='block' />
      </Menu.Item>

      {currentUser.attributes.role === 'journalist' && (
        <Menu.Item
          as={NavLink}
          to="/create-article"
          name="Create Article"
          id="create-article"
        />
      )}

      <Menu.Menu position="right">
        {currentUser.attributes.role !== 'journalist' && (
          <Menu.Item
            as={NavLink}
            to="/subscribe"
            name="Subscribe"
            id="subscription-form"
          />
        )}  

        {currentUser.isSignedIn === false && (
          <Menu.Item
            as={NavLink}
            to="/signup"
            name="Sign Up"
            id="signup-button"
          />
        )}

        {currentUser.isSignedIn ? (
          <Logout />
        ) : (
            <Menu.Item 
              as={NavLink}
              to="/login"
              name="Login"
              id="login-button"
            />
          )}
      </Menu.Menu>      
    </Menu>
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
  )(NavBar)