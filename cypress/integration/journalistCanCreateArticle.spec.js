describe('User can create article', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/articles',
      response: 'fixture:successfully_created_article.json',
      status: 200
    })
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/auth/sign_in',
      response: 'fixture:successful_journalist_login.json',
      status: 200,
      headers: {
        "uid": "user2@mail.com"
      }
    })
    cy.visit('http://localhost:3001')
    cy.journalist_login('user2@mail.com', 'password')
  })
  it('successfully', () => {
    cy.get('#create-article').click()

    cy.get('#article-form').within(() => {
      cy.get('#title-input').type('Trump has gone insane')
      cy.get('#content-input').type('Trump has been diagnosed with crazy syndrome')
      cy.get('#author-input').type('Faraz')
      cy.get('button[type="button"]').click()
      cy.get('.fileContainer').within(() => {
        const fileName = 'test.jpg'
        cy.fixture(fileName).then(fileContent => {
          cy.get('input[type="file"]').upload({ fileContent, fileName, mimeType: 'application/jpg' })
        })
      })

      cy.get('#submit-article').click()
    })
    cy.get('#response-message').should('contain', 'Your article was submitted for review')
  })

  it('unsuccessfully', () => {
    cy.route({
      method: 'POST',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/articles',
      response: 'fixture:unsuccessfully_created_article.json',
      status: 400
    })
    cy.get('#create-article').click()
    cy.get('#article-form').within(() => {
      cy.get('#title-input').type('Trump has gone insane')
      cy.get('#content-input').type('Trump has been diagnosed with crazy syndrome')
      cy.get('#author-input').type('Faraz')
      cy.get('button[type="button"]').click()
      cy.get('.fileContainer').within(() => {
        const fileName = 'data.json'
        cy.fixture(fileName).then(fileContent => {
          cy.get('input[type="file"]').upload({ fileContent, fileName, mimeType: 'application/json' })
        })
      })
      
      cy.get('#submit-article').click()
    })
    cy.get('.errorsContainer').within(() => {
      cy.contains('is not a supported file extension')
    })
    cy.get('#response-message').should('contain' , 'Request failed with status code 400')
  })
})