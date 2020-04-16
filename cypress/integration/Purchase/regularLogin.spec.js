/* eslint-disable no-undef */
import React from 'react'
import App from "../../../src/App"

describe('Login Flow ', () => {

    // in this test I used assertions to validate state change in the main App component
    it('Should add user name and password and state should change to a valid user', async () => {
      // go to main app login page
      cy.visit('http://localhost:3000/')
      cy.mount(<App />)
      cy.get(App)
      .its('state')
      .should('deep.equal', { user: '', validUser: false })

      // enter user name and password and validate
      cy.get('.username')
        .type('sample_user', { delay: 100 });
      cy.get('.password')
        .type('8gZ4ZPaPSKfzFC4', { delay: 100 });
      cy.get('.loginButton').click()
      cy.get(App)
      .its('state.validUser')
      .should('equal', true)
    })
})
