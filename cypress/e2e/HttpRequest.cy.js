// Admin pages have been tested manually, won't put it in due to privacy reasons
// NOTE THAT IF YOU ARE TESTING, MAKE SURE TO CHANGE THE PORT NUMBER BASED ON WHAT THE LINK GIVES YOU 
// WHEN YOU USE "npx firebase serve" COMMAND
describe('Handling HTTP Requests', () => {
    it('Should return a 200 status - home page', () => {
        cy.request('GET', 'http://localhost:5000/#/')
          .its('status')
          .should('eq', 200);
    });

    it('Should return a 200 status - register page', () => {
        cy.request('GET', 'http://localhost:5000/#/register')
          .its('status')
          .should('eq', 200);
    });

    it('Should return a 200 status - login page', () => {
      cy.request('GET', 'http://localhost:5000/#/login')
        .its('status')
        .should('eq', 200);
    });

    it('Should return a 200 status - reset password page', () => {
        cy.request('GET', 'http://localhost:5000/#/resetpassword')
          .its('status')
          .should('eq', 200);
    });
  
    it('Should return a 200 status - grant selection page', () => {
        cy.request('GET', 'http://localhost:5000/#/grantselection')
          .its('status')
          .should('eq', 200);
      });

      it('Should return a 200 status - past submissions page', () => {
        cy.request('GET', 'http://localhost:5000/#/pastsubmissions')
          .its('status')
          .should('eq', 200);
      });

      it('Should return a 200 status - sub app form page', () => {
        cy.request('GET', 'http://localhost:5000/#/subappform')
          .its('status')
          .should('eq', 200);
      });

      it('Should return a 200 status - sub app form 2 page', () => {
        cy.request('GET', 'http://localhost:5000/#/subappform2')
          .its('status')
          .should('eq', 200);
      });

      it('Should return a 200 status - application form page', () => {
        cy.request('GET', 'http://localhost:5000/#/applicationformpage')
          .its('status')
          .should('eq', 200);
      });

      it('Should return a 200 status - application form page 2', () => {
        cy.request('GET', 'http://localhost:5000/#/applicationformpage2')
          .its('status')
          .should('eq', 200);
      });

  // Bonus Testing for 404 Not Found Handling
    it('Should handle 404 Not Found response if you do not use the hash', () => {
      cy.request({
        method: 'GET',
        url: 'http://localhost:5000/aaaa',
        failOnStatusCode: false,
      })
      .then(response => {
        console.log(response); 
        expect(response.status).to.equal(404);
      });
    });
  
    it('Should redirect you to a 404 not found page when using hash', () => {
      cy.request('GET', 'http://localhost:5000/#/aaaa')
      cy.visit('http://localhost:5000/#/PageNotFound'); 
    });
  });