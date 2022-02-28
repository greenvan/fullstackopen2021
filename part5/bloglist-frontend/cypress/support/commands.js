/* eslint-disable linebreak-style */
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
    cy.visit('http://localhost:3000')
  })
  /*
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
*/
})


Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {


  const likeCount = likes ? likes : 0

  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: {
      'title': `${title}`,
      'author': `${author}`,
      'url': `${url}`,
      'likes': `${likeCount}`,
    },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogappUser')).token}`
    },

  })


  cy.visit('http://localhost:3000')
})