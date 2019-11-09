describe('user can view chosen article', () => {
  beforeEach(() => {
    cy.server()
    cy.route({
      method: 'GET',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/articles',
      response: 'fixture:articles.json'
    })
    cy.route({
      method: 'GET',
      url: 'https://classy-news-backend.herokuapp.com/api/v1/articles/1',
      response: 'fixture:article.json'
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

  it('sees article displayed', () => {
    cy.get('#navbar-home').click()
    cy.wait(100)
    cy.contains('The Louvre museum in Paris,')
    cy.get('#article_1').click()
      cy.get('#single-article').within(() => {
        cy.get('#title_1').should('contain', 'Leonardo da Vinci five centuries on')
        cy.get('#content_1').should('contain','to a display')
        cy.get('#publish_date_1').should('contain', '20 October 2019')
        cy.get('#author_1').should('contain', 'Lauren Lion')
      })
  })
})