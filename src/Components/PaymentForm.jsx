import React, { Component } from 'react'
import { Elements, StripeProvider } from 'react-stripe-elements'
import CheckoutForm from '../Components/CheckoutForm'
import { Container, Button } from 'semantic-ui-react'
import { connect } from 'react-redux';

class PaymentForm extends Component {
  state = {
    renderPaymentForm: false
  }

  renderPaymentForm = () => {
    this.setState(
      prevState => ({ renderPaymentForm: !prevState.renderPaymentForm })
    )
  }
 
  render() {
    let displayPayment

    if (this.state.renderPaymentForm) {
      displayPayment = (
        <Container>
          <StripeProvider apiKey={process.env.REACT_APP_STRIPE_API_KEY}>
            <div>
              <Elements>
                <CheckoutForm />
              </Elements>
            </div>
          </StripeProvider>
        </Container>
      )
    } else {
        displayPayment = (
          <div>
            <Button id="paymentform-button" onClick={ this.renderPaymentForm }>Buy a subscription!</Button>
          </div>
        )
      }

    return (
      <>
        {displayPayment}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    currentUser: state.reduxTokenAuth.currentUser
  }
}
export default connect(
  mapStateToProps,  
  null
)(PaymentForm);