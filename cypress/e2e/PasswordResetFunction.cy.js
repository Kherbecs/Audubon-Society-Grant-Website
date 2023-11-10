// NOTE THAT IF YOU ARE TESTING, MAKE SURE TO CHANGE THE PORT NUMBER BASED ON WHAT THE LINK GIVES YOU 
// WHEN YOU USE "npx firebase serve" COMMAND
describe('Reset Password', () => {
    it('Error handling for empty fields', () => {
      // Visit the reset password page
      cy.visit('http://localhost:5000/#/passwordreset'); 
    
      // Click the Submit button
      cy.get('button').contains('Submit').click();

      cy.get('#alert-message').should('exist').and('have.text', 'Please enter your email');
    });

    it('Error handling for invalid email format', () => {
        // Visit the reset password page
        cy.visit('http://localhost:5000/#/passwordreset'); 
      
        // Input invalid email format
        cy.get('input[type="email"]').type('dddd'); 

        // Click the Submit button
        cy.get('button').contains('Submit').click();
  
        cy.get('#alert-message').should('exist').and('have.text', 'Please enter a valid email address');
      });

      it('Error handling for invalid email', () => {
        // Visit the reset password page
        cy.visit('http://localhost:5000/#/passwordreset'); 
      
        // Input an unknown account
        cy.get('input[type="email"]').type('dddd@gmail.com'); 

        // Click the Submit button
        cy.get('button').contains('Submit').click();
  
        cy.get('#alert-message').should('exist').and('have.text', 'Account not found');
      });
  });