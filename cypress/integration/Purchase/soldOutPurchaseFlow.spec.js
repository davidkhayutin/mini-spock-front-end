/* eslint-disable no-undef */

// In this test I go through the basic user flow of adding 
// the same item until the item is sold out
// afterwards I cancel the purchase and the item quantity returns to its original state
// throughout the test we are validating the text that is being displayed
// as it associates with the actions of the test

describe('Cancel Purchase', () => {
    it('Should select all of one item until its sold out, then cancel', async () => {

        cy.visit('http://localhost:3000/')
        
        let value = 0
        cy.request('PUT', 'https://baby-spock.herokuapp.com/products/1', {quantity:3})

        cy.request('GET', 'https://baby-spock.herokuapp.com/products')
            .then((response) => {
                value = response.body[0].quantity
            })
        cy.get('.username')
            .type('sample_user', { delay: 100 });
        cy.get('.password')
            .type('8gZ4ZPaPSKfzFC4', { delay: 100 });
        cy.get('.loginButton').click()
        cy.wait(500)

        cy.get('.1desc').should((item)=>{
            const text = item.text()
            expect(text).to.include(3)
        })
        cy.wait(500)

        cy.get('.1Button').then(()=>{
            for(let i = 0; i < value; i++){
                cy.get('.1Button').click()
                cy.wait(500)
            }
        })
        cy.wait(500)
        cy.get('.soldOut').should('be.visible')

        cy.get('.1desc').should((item)=>{
            const text = item.text()
            expect(text).to.include(0)
        })
        
        cy.wait(500)
        cy.get('.modalButton').click();
        cy.wait(500)

        cy.get('.makeStyles-paper-91').should((item)=>{
            const text = item.text()
            expect(text).to.include(6000)
        })
        cy.get('.cancelPurchaseButton').click()   
        cy.wait(500)

        cy.get('.1desc').should((item)=>{
            const text = item.text()
            expect(text).to.include("There are 3 items left of this product")
        })

    })
})