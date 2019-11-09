import 'cypress-file-upload'

Cypress.Commands.add("user_login", (email, password) => {
  cy.route({
    method: "POST",
    url: "https://classy-news-backend.herokuapp.com/api/v1/auth/sign_in",
    response: "fixture:successful_user_login.json",
    status: 200,
      headers: {
        "uid": "user@mail.com"
      }
  })
  cy.visit("http://localhost:3001")
  cy.get('#login-button').click()
    cy.get('#login-form').within(()=> {
      cy.get('#email-input').type(email)
      cy.get('#password-input').type(password)
    })
    cy.get('#submit-login-form').click()
})

Cypress.Commands.add("journalist_login", (email, password) => {
  cy.route({
    method: "POST",
    url: "https://classy-news-backend.herokuapp.com/api/v1/auth/sign_in",
    response: "fixture:successful_journalist_login.json",
    status: 200,
      headers: {
        "uid": "user2@mail.com"
      }
  })
  cy.visit("http://localhost:3001")
  cy.get('#login-button').click()
    cy.get('#login-form').within(()=> {
      cy.get('#email-input').type(email)
      cy.get('#password-input').type(password)
    })
    cy.get('#submit-login-form').click()
})

Cypress.Commands.add("subscriber_login", (email, password) => {
  cy.route({
    method: "POST",
    url: "https://classy-news-backend.herokuapp.com/api/v1/auth/sign_in",
    response: "fixture:successful_subscriber_login.json",
    status: 200,
      headers: {
        "uid": "user@mail.com"
      }
  })
  cy.visit("http://localhost:3001")
  cy.get('#login-button').click()
    cy.get('#login-form').within(()=> {
      cy.get('#email-input').type(email)
      cy.get('#password-input').type(password)
    })
    cy.get('#submit-login-form').click()
})

Cypress.Commands.add("unsuccessful_user_login", (email, password) => {
  cy.route({
    method: 'POST',
    url: 'https://classy-news-backend.herokuapp.com/auth/sign_in',
    response: 'fixture:unsuccessful_user_login.json',
    status: 422,
    headers: {
      "uid": "user@mail.com"
    }
  })
  cy.visit("http://localhost:3001")
  cy.get('#login-button').click()
    cy.get('#login-form').within(()=> {
      cy.get('#email-input').type(email)
      cy.get('#password-input').type(password)
    })
    cy.get('#submit-login-form').click()
})