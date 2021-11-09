describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Green Van',
      username: 'greenvan',
      password: 'mypass'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains ('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('greenvan')
      cy.get('#password').type('mypass')
      cy.get('#login-button').click()

      cy.contains('User Green Van logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('greenvan')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()


      cy.get('.error')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')

      //Checks that the application does not render the success message 'Matti Luukkainen logged in':
      cy.get('html').should('not.contain', 'User Green Van logged in')
    })
  })
})