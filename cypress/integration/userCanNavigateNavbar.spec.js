describe('User can navigate NavBar', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/articles',
    })
    cy.visit('http://localhost:3001')
  })

  it('journalist can access the write article page', () => {
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/auth/sign_in',
      response: 'fixture:successful_journalist_login.json',
      status: 200,
      headers: {
        "uid": "user2@mail.com"
      }
    })
    
    cy.journalist_login('user2@mail.com', 'password')
    cy.get('#create-article').click()
    cy.get('#article-form').should('exist')
  })

  it('user can access the different links in navbar', () => {
    cy.visit('http://localhost:3001')
    cy.server()
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/articles',
    })
    cy.get('#create-article').should('not.exist')
    cy.get('#subscription-form').should('exist')
    cy.get('#login-button').should('exist')
    cy.get('#signup-button').should('exist')
  })
})
