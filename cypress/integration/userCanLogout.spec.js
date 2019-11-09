describe('User can logout', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('http://localhost:3001')
  })

  it('successfully', () => {
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/auth/sign_in',
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
    cy.route({
      method: 'DELETE',
      url: 'https://classy-news-backend.herokuapp.com/auth/sign_out',
      response: 'fixture:successful_user_logout.json',
      status: 200,
      headers: {
        "uid": "user@mail.com"
      }
    })
    cy.get('#logout-button').click()
    cy.get('#signup-button').should('exist')
    cy.get('#logout-button').should('not.exist')
  })

  it('Needs to be logged in to see the logout button', () => {
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/articles'
    })

    cy.get('#login-button').should('exist')
    cy.get('#logout-button').should('not.exist')
  })
})