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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'greenvan', password: 'mypass' })
    })

    it('A blog can be created', function() {

      cy.createBlog({
        title: 'Blog created by cypress',
        author: 'Cypress author',
        url: 'fake url' })

      cy.contains('Blog created by cypress')

    })

    it('And it can be liked', function () {

      cy.createBlog({
        title: 'Blog created by cypress with 12 likes',
        author: 'Cypress author',
        url: 'fake url',
        likes: 12 })

      cy.get('.blog').contains('details').click()
      cy.get('.blogDetails').should('contain', 'Like count: 12')
      cy.get('.likeButton').click()
      cy.get('.blogDetails').should('contain', 'Like count: 13')
    })


    it('It also can be deleted by its creator', function () {

      cy.createBlog({
        title: 'Blog created by cypress just to be deleted',
        author: 'Cypress author',
        url: 'fake url',
        likes: 7 })

      cy.get('.blog').should('contain', 'Blog created by cypress just to be deleted')
      cy.get('.blog').contains('details').click()
      cy.contains('Remove').click()
      cy.get('html').should('not.contain', 'Blog created by cypress just to be deleted')
    })

    describe('and there are several blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Blog with no likes',
          author: 'Cypress author',
          url: 'http://cypresstestingblogapp.nice',
        })
          .then(() =>
            cy.createBlog({
              title: 'Blog with 1 like',
              author: 'Cypress author',
              url: 'http://cypresstestingblogapp.nice',
              likes: 1,
            })
          )
          .then(() =>
            cy.createBlog({
              title: 'Blog with 10 likes',
              author: 'Cypress author',
              url: 'http://cypresstestingblogapp.nice',
              likes: 10,
            })
          )
      })

      it('blogs are ordered by number of likes', function () {
        cy.get('.blog').then((blogs) => {
          expect(blogs[0].textContent).to.contains('Blog with 10 likes')
          expect(blogs[1].textContent).to.contains('Blog with 1 like')
          expect(blogs[2].textContent).to.contains('Blog with no likes')
        })
      })

    })


  })


})