describe('User can pay for subscription', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url:'http://localhost:3000/auth',
      response: 'fixture:successful_user_login.json'
    })
    cy.visit('http://localhost:3001')
    cy.get('#signup-button').click()
    cy.get('#signup-form').within(()=> {
      cy.get('#nickname-input').type('nickname')
      cy.get('#name-input').type('name')
      cy.get('#city-input').type('city')
      cy.get('#country-input').select('Sweden')
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
      cy.get('#password-confirmation').type('password')
    })
    cy.get('#submit-signup-form').click()
  })

  it('Successfully submits payment', () => {
    cy.get('#paymentform-button').click()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/subscriptions',
      response: 'fixture:successful_subscription_payment.json',
      status: 200
    })
    cy.wait(2000)
    cy.get('.__PrivateStripeElement > iframe').then($elements => {
      const stripeElementsInputSelector = '.InputElement'

      const creditInput = $elements
        .eq(0)
        .contents()
        .find(stripeElementsInputSelector)
      cy.wrap(creditInput).type('4242424242424242')

      cy.wait(500)
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
    cy.wait(200);
    cy.get('#message').should('contain','Payment Successful')
  })

  it('Unsuccessfully submits payment', () => {
    cy.get('#paymentform-button').click()
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/subscriptions',
      response: 'fixture:unsuccessful_subscription_payment.json',
      status: 402
    })
    cy.wait(2000)
    cy.get('.__PrivateStripeElement > iframe').then($elements => {
      const stripeElementsInputSelector = '.InputElement'

      const creditInput = $elements
        .eq(0)
        .contents()
        .find(stripeElementsInputSelector)
      cy.wrap(creditInput).type('4242424242424242')

      cy.wait(500)
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
    cy.wait(200);
    cy.contains('Something went wrong, please try again.')
  })

  it('is not visible for visitor', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url:'http://localhost:3000/api/v1/articles',
      response: 'fixture:articles.json'
    })
    cy.visit('http://localhost:3001')
    cy.get('#payment-form').should('not.exist')
  })
})