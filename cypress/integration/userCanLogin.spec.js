describe('User can sign up', () => {
  beforeEach(() => {
    cy.server()
  })

  it('successfully', () => {
    cy.visit('http://localhost:3001');
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:successful_user_login.json',
      status: 200,
      headers: {
        "uid": "user@mail.com"
      }
    })

    cy.get('#login-button').click()
    cy.get('#login-form').within(()=> {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('password')
    })
    cy.get('#submit-login-form').click()
    cy.get('#welcome-message').should('contain', 'Hello name')
  })

  it('unsuccessfully', () => {
    cy.visit('http://localhost:3001');
    cy.server();
    cy.route({
      method: 'POST',
      url: 'http://localhost:3000/auth/sign_in',
      response: 'fixture:unsuccessful_user_signup.json',
      status: 422,
    })

    cy.get('#login-button').click()
    cy.get('#login-form').within(()=> {
      cy.get('#email-input').type('user@mail.com')
      cy.get('#password-input').type('passwordd')
    })
    cy.get('#submit-login-form').click()
    cy.contains('Invalid credentials')
  })
})