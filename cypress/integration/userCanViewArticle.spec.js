describe('user can view chosen article', () => {
  it('sees article displayed', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      response: 'fixture:articles.json'
    })
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles/1',
      response: 'fixture:article.json'
    })
    cy.visit('http://localhost:3001')
    cy.wait(20)
    cy.contains('The Louvre museum in Paris,')
    cy.get('#article_1').click()
      cy.get('#single-article').within(() => {
        cy.get('#article-title').should('contain', 'Leonardo da Vinci five centuries on')
        cy.get('#article-content').should('contain','to a display')
        cy.get('#article-date').should('contain', '20 October 2019')
        cy.get('#article-author').should('contain', 'Lauren Lion')
      })
  })
})