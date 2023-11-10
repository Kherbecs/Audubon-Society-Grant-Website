// NOTE THAT IF YOU ARE TESTING, MAKE SURE TO CHANGE THE PORT NUMBER BASED ON WHAT THE LINK GIVES YOU 
// WHEN YOU USE "npx firebase serve" COMMAND
describe('Logout Function', () => {
    it('Logs out from grantselection using the usernavbar and redirects to login', () => {
      // Visit the login page
      cy.visit('http://localhost:5000/#/login'); 
    
      // Type login info
      cy.get('input[type="email"]').type('pixelwondermentdepartment@gmail.com'); 
      cy.get('input[type="password"]').type('teampwd'); 
    
      // Click the login button
      cy.get('button[type="button"]').contains('Sign In').click(); 

      // Visit grantselection
      cy.visit('http://localhost:5000/#/grantselection'); 
  
      // Makes sure that the logout is in the nav bar
      cy.get('a.nav-link').contains('LOGOUT').should('be.visible');
  
      // Click the logout link
      cy.get('a.nav-link').contains('LOGOUT').click();
  
      // Redirects to login
      cy.url().should('include', 'http://localhost:5000/#/login'); 
    });
  
    it('Logs out from pastsubmissions using the usernavbar and redirects to login', () => {
      // Visit the login page
      cy.visit('http://localhost:5000/#/login'); 
    
      // Type login info
      cy.get('input[type="email"]').type('pixelwondermentdepartment@gmail.com'); 
      cy.get('input[type="password"]').type('teampwd'); 
    
      // Click the login button
      cy.get('button[type="button"]').contains('Sign In').click(); 

      // Visit pastsubmissions
      cy.visit('http://localhost:5000/#/pastsubmissions');
  
      // Makes sure that the logout is in the nav bar
      cy.get('a.nav-link').contains('LOGOUT').should('be.visible');
  
      // Click the logout link
      cy.get('a.nav-link').contains('LOGOUT').click();

       // Redirects to login
       cy.url().should('include', 'http://localhost:5000/#/login'); 
    });

    it('Logs out from home page as a login user and redirects to login', () => {
        // Visit the login page
        cy.visit('http://localhost:5000/#/login'); 
      
        // Type login info
        cy.get('input[type="email"]').type('pixelwondermentdepartment@gmail.com'); 
        cy.get('input[type="password"]').type('teampwd'); 
      
        // Click the login button
        cy.get('button[type="button"]').contains('Sign In').click(); 
      
        // Redirect to grantselection page 
        cy.url().should('include', 'http://localhost:5000/#/grantselection'); 
    
        // Redirect to home page
        cy.visit('http://localhost:5000/#/');
    
        // Scroll to the logout button to make it visible in the viewport
        cy.get('a.nav-link').contains('LOGOUT').scrollIntoView().should('be.visible');
    
        // Click the logout link
        cy.get('a.nav-link').contains('LOGOUT').click();
        
        // Redirects to login
        cy.url().should('include', 'http://localhost:5000/#/login'); 
      });
  });