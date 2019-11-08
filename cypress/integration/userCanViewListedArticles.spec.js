describe('user can view listed articles', () => {
  it('sees articles displayed', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      response: 'fixture:articles.json'
    })
    cy.visit('http://localhost:3001')
    cy.contains('Leonardo da Vinci five centuries on:')
    cy.contains('Some Title')
    cy.contains('The Louvre museum in Paris,')
    cy.contains('Some good content')
    cy.contains('Lauren Lion')
    cy.contains('Some awesome author')
    cy.contains('20 October 2019')
  })

  it('sees error message for no articles', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      status: 400,
      response: {}
    })
    cy.visit('http://localhost:3001')
    cy.contains('Request failed with status code 400')
  })
})