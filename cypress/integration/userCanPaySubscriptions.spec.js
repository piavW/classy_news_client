describe('User can pay for subscription', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200,
      headers: {
        "uid": "user@mail.com"
      }
    })
    cy.visit('http://localhost:3001')
  })

  it('Successfully submits payment', () => {
    cy.user_login('user@mail.com', 'password')
    cy.get('#subscription-form').click()
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/subscriptions',
      response: 'fixture:successful_subscription_payment.json',
      status: 200
    })
    cy.wait(1000)
    cy.get('.__PrivateStripeElement > iframe').then($elements => {
      const stripeElementsInputSelector = '.InputElement'

      const creditInput = $elements
        .eq(0)
        .contents()
        .find(stripeElementsInputSelector)
      cy.wrap(creditInput).type('4242424242424242')

      const expirationInput = $elements
        .eq(1)
        .contents()
        .find(stripeElementsInputSelector)
      cy.wrap(expirationInput).type('12/23')

      const cvcInput = $elements
        .eq(2)
        .contents()
        .find(stripeElementsInputSelector)
      cy.wrap(cvcInput).type('123')
    })

    cy.get('#subscribe-button').click()
    cy.wait(200)
    cy.get('#message').should('contain','Payment Successful')
  })

  it('Unsuccessfully submits payment', () => {
    cy.user_login('user@mail.com', 'password')
    cy.get('#subscription-form').click()
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/subscriptions',
      response: 'fixture:unsuccessful_subscription_payment.json',
      status: 402
    })
    cy.wait(1000)
    cy.get('.__PrivateStripeElement > iframe').then($elements => {
      const stripeElementsInputSelector = '.InputElement'

      const creditInput = $elements
        .eq(0)
        .contents()
        .find(stripeElementsInputSelector)
      cy.wrap(creditInput).type('4242424242424242')

      const expirationInput = $elements
        .eq(1)
        .contents()
        .find(stripeElementsInputSelector)
      cy.wrap(expirationInput).type('12/24')

      const cvcInput = $elements
        .eq(2)
        .contents()
        .find(stripeElementsInputSelector)
      cy.wrap(cvcInput).type('123')
    })

    cy.get('#subscribe-button').click()
    cy.wait(200)
    cy.contains('Something went wrong, please try again.')
  })
})