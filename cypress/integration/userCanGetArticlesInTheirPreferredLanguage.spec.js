describe('User can get articles in their preferred language', () => {
  beforeEach(() => {
    cy.server()

    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      response: 'fixture:articles.json'
    })

    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles/?language=sv',
      response: 'fixture:swedish_articles.json'
    })
  })


  it('successfully shows swedish articles', () => {
    cy.visit(
      'http://localhost:3001',
      { 
        onBeforeLoad: 
          (_contentWindow) => { 
            Object.defineProperty(
              _contentWindow.navigator, 
              'language', 
              { value: 'sv-SE' }
            ) 
          } 
      }
    )
    cy.get('#article_1')
      .should('contain', 'Leonardo da Vinci fem decennier på:')
      .should('contain', 'Någon Titel')
    cy.get('#active_article_language')
      .should('contain', 'SV')
  })

  xit('sees error message for no articles translation', () => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'http://localhost:3000/api/v1/articles',
      status: 404,
    })
    cy.visit('http://localhost:3001')
    cy.get('#swedish-button').click()
    cy.get('#error-message')
  })
}) 