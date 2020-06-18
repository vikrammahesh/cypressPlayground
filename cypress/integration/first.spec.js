import signInPage from '../pageHelpers/signInPage.helpers'
import route from '../pageHelpers/route.helper'
import singInPage from '../pageHelpers/signInPage.helpers'

describe('Practice Test scenarios', ()=>{
 it('This is my first test case', ()=>{
    cy.visit('/')
    //cy.executeQuery('select status from report where id=16142')
    // cy.log(Cypress.env('userName'))
      cy.get('#loginMessage').then( (text) =>{
        expect(text).to.contain('Sign')
      })
     //cy.pause()
     cy.get('#userNameInput').type(Cypress.env('userName'))
     cy.get('#passwordInput').type(Cypress.env('password') , {log: false})
   
   
 })

})