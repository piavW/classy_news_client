describe('website changes language', () => {
  it('shows login button in English', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      response: 'fixture:articles.json'
    })

    cy.visit('http://localhost:3001')
      onBeforeLoad(Object.defineProperty(navigator, 'language', { value: 'en' }))
    cy.get('#login-button')
      .should('contain', 'Login')
  }),

  it('shows login button in Swedish', () => {
    cy.visit('http://localhost:3001')
      onBeforeLoad(Object.defineProperty(navigator, 'language', { value: 'sv' }))
    cy.get('#login-button')
    .should('contain', 'Logga in')
  })
})