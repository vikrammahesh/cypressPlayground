describe('Play ground spec',()=>{
   
  beforeEach( ()=> {
     cy.visit('https://example.cypress.io/commands/network-requests');
  })
  
  it('test get comment', ()=> {
     var message= 'Oops ! something is wrong'
     cy.server()

     cy.route('**/comments/*').as('getComment')
     
     cy.get('.network-btn').click()
     cy.wait('@getComment').then( (xhr) => {
        expect(xhr.status).equal(200)
     })

     cy.route('POST', '/comments').as('postComment')

     cy.get('.network-post').click()
     cy.wait('@postComment').should( (xhr) => {
       expect(xhr.requestBody).to.include('email')
       expect(xhr.requestHeaders).to.have.property('Content-Type')
       expect(xhr.responseBody).to.have.property('name', 'Using POST in cy.route()')
     })

     cy.route({
      method: 'PUT', 
      url: 'comments/*', 
      status: 404, 
      response: {error: message},
      delay: 5000,
     }).as('putComments')
   cy.get('.network-put').click();
   cy.wait('@putComments').its('status').should('eq', 404)
  
   cy.get('.network-put-comment').should('contain', message)


  }) 
 

})