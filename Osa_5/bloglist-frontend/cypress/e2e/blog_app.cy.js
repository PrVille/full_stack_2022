/* eslint-disable no-undef */
describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Superuser',
        username: 'root',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
    }) 
    
    it('Login form is shown', function() {
      cy.contains('Log in to application')
    })

    it('login form can be opened', function() {
        cy.contains('login').click()
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('salainen')
            cy.get('#login-button').click()
        
            cy.contains('Superuser logged-in')
        })
    
        it('fails with wrong credentials', function() {
            cy.contains('login').click()
            cy.get('#username').type('root')
            cy.get('#password').type('secret')
            cy.get('#login-button').click()
        
            cy.get('.errMsg')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
    
            cy.get('html').should('not.contain', 'Superuser logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
          cy.login({ username: 'root', password: 'salainen' })
        })
    
        it('A blog can be created', function() {
          cy.contains('new blog').click()
          cy.get('#form-title').type('a blog')
          cy.get('#form-author').type('cypress')
          cy.get('#form-url').type('www.cypress.com')
          cy.get('#form-submit').click()
          cy.contains('a blog cypress')
        })

        describe('and several blogs exists', function () {
            beforeEach(function () {
              cy.createBlog({
                title: 'a blog test 1',
                author: 'cypress',
                url: 'www.url.com'
              })
              cy.createBlog({
                title: 'a blog test 2',
                author: 'cypress',
                url: 'www.url.com'
              })
              cy.createBlog({
                title: 'a blog test 3',
                author: 'cypress',
                url: 'www.url.com'
              })
            })
      
            it('one of those can be liked', function () {
              cy.contains('a blog test 1').contains('show').click()
              cy.contains('a blog test 1').contains('0').contains('like').click()
              cy.contains('a blog test 1').contains('1')
            })

            it('one of those can be removed by the user who created it', function () {
                cy.contains('Superuser logged-in')
                cy.contains('a blog test 1').contains('show').click()
                cy.contains('a blog test 1').contains('Superuser')
                cy.contains('a blog test 1').contains('remove').click()
                cy.get('html').should('not.contain', 'a blog test 1')
            })

            it('they are ordered according to likes with the blog with the most likes being first', function () {
                cy.contains('a blog test 3').contains('show').click()
                cy.contains('a blog test 3').contains('like').click()
                cy.contains('a blog test 3').contains('1')
                
                cy.contains('a blog test 2').contains('show').click()
                cy.contains('a blog test 2').contains('like').click()
                cy.contains('a blog test 2').contains('1')
                cy.contains('a blog test 2').contains('like').click()
                cy.contains('a blog test 2').contains('2')

                cy.contains('a blog test 1').contains('show').click()
                cy.contains('a blog test 1').contains('0')

                cy.get('.blog').eq(0).should('contain', 'a blog test 2')
                cy.get('.blog').eq(1).should('contain', 'a blog test 3')
                cy.get('.blog').eq(2).should('contain', 'a blog test 1')

                cy.contains('a blog test 3').contains('like').click()
                cy.contains('a blog test 3').contains('2')
                cy.contains('a blog test 3').contains('like').click()
                cy.contains('a blog test 3').contains('3')

                cy.get('.blog').eq(0).should('contain', 'a blog test 3')
              
            })
          })
      })
  })