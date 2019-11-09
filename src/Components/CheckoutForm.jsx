import React, { Component } from 'react'
import axios from 'axios'
import { 
        CardNumberElement,
        CardExpiryElement,
        CardCvcElement,
        injectStripe 
      } from 'react-stripe-elements'
import { Form, Container, Button, Card } from 'semantic-ui-react'
import getCurrentCredentials from '../Modules/GetCredentials'

class CheckoutForm extends Component {
  state = {
    renderCheckoutForm: true,
    message: ''
  }

  submitPayment = async (ev) => {
    ev.preventDefault()
    await this.props.stripe.createToken().then(({ token }) => {
      token && this.stripePayment(token.id) 
    })
  }

  stripePayment = async (stripeToken) => {
    try {
      let response = await axios.post('https://classy-news-backend.herokuapp.com/api/v1/subscriptions', {
        stripeToken 
      }, {
        headers: getCurrentCredentials()
      })
      if (response.status === 200) {
        this.setState({ message: response.data.message })
        this.setState({ renderCheckoutForm: false })
      }
    } catch (error) {
      this.setState({
        message: error.response.data.message
      }) 
    }
  }

  render() {
    let stripeForm
    let message

    if (this.state.message) {
      message = <p id="message">{ this.state.message }</p>
    }

    if (this.state.renderCheckoutForm) {
      stripeForm = (
        <Form id="payment-form">
          <Form.Field>
            <h3>Subscribe to access our content.</h3>
            <label>Please choose your subscription plan:</label>
            <Form.Field>
              <Card>
                <Card.Content header="Yearly" />
                <Card.Content description="5000 SEK" />
              </Card>
            </Form.Field>
          </Form.Field>
          <Form.Field>
            <label>Credit Card Number:</label>
            <Form.Field>
              <CardNumberElement />
            </Form.Field>
          </Form.Field>
          <Form.Field>
            <label>Expire Date:</label>
            <Form.Field>
              <CardExpiryElement />
            </Form.Field>
          </Form.Field>
          <Form.Field>
            <label>CVC Number:</label>
            <Form.Field>
              <CardCvcElement />
            </Form.Field>
          </Form.Field>
          <Form.Field>
            <Button onClick={this.submitPayment} id="subscribe-button">
              Proceed with Payment
            </Button>
          </Form.Field>
        </Form>
      )
    }
    return (
      <Container>
        {stripeForm}
        {message}
      </Container>
    )
  }
}

export default injectStripe((CheckoutForm))