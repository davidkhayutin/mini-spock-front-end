/* eslint-disable no-undef */

// In this test I go through the basic user flow of adding items
// to a cart and then completing purchase
describe('Regular Purchase flow ', () => {
    it('Should visit the main store page add one of each item and then checkout', async () => {
      cy.visit('http://localhost:3000/')
      cy.get('.username')
        .type('sample_user', { delay: 100 });
      cy.get('.password')
        .type('8gZ4ZPaPSKfzFC4', { delay: 100 });
      cy.get('.loginButton').click()
      cy.wait(500)
      cy.get('.1Button').click()
      cy.wait(500)
      cy.get('.2Button').click();
      cy.wait(500)
      cy.get('.3Button').click();
      cy.wait(500)
      cy.get('.modalButton').click();
      cy.wait(500)
      cy.get('.completePurchaseButton').click()   
    })
})