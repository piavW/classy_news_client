import React from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from '../Components/CheckoutForm'
import { Container } from 'semantic-ui-react'
import { connect } from 'react-redux'

const PaymentForm = () => {
  return (
    <>
      <Container>
        <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
          <div>
            <Elements>
              <CheckoutForm />
            </Elements>
          </div>
        </StripeProvider>
      </Container>
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
)(PaymentForm)