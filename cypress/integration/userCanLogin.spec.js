describe('User can sign up', () => {
  beforeEach(() => {
    cy.server()
    cy.visit('http://localhost:3001')
  })

  it('successfully', () => {
    cy.user_login('user@mail.com', 'password')
  })

  it('unsuccessfully', () => {
    cy.unsuccessful_user_login('user@mail.com', 'passwordd')
    cy.contains('Invalid credentials')
  })
})