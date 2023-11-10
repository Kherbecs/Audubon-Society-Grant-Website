// Very similar to the Admin Login function, won't need testing since it's good
// NOTE THAT IF YOU ARE TESTING, MAKE SURE TO CHANGE THE PORT NUMBER BASED ON WHAT THE LINK GIVES YOU 
// WHEN YOU USE "npx firebase serve" COMMAND
describe('Login Function', () => {
  it('Login as a user and be redirected to grantselection page', () => {
    // Visit the login page
    cy.visit('http://localhost:5000/#/login'); 
  
    // Type login info
    cy.get('input[type="email"]').type('pixelwondermentdepartment@gmail.com'); 
    cy.get('input[type="password"]').type('teampwd'); 
  
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
  
    // Redirect to grantselection page 
    cy.url().should('include', 'http://localhost:5000/#/grantselection'); 
  });

  it('Does error handling when inputting empty fields', () => {
    // Visit the login page
    cy.visit('http://localhost:5000/#/login'); 
  
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 

    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Please fill out the form');
  });

  it('Does error handling when inputting password field only', () => {
    // Visit the login page
    cy.visit('http://localhost:5000/#/login'); 
  
    // Type login info
    cy.get('input[type="password"]').type('teampwd'); 

    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 

    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Please enter your email');
  });

  it('Does error handling when inputting email field only', () => {
    // Visit the login page
    cy.visit('http://localhost:5000/#/login'); 
  
    // Type login info
    cy.get('input[type="email"]').type('pixelwondermentdepartment@gmail.com'); 

    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 

    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Please enter your password');
  });

  it('Does error handling when inputting incorrect password or email', () => {
    // Visit the login page
    cy.visit('http://localhost:5000/#/login'); 
  
    // Type login info
    cy.get('input[type="email"]').type('pixelwondermentdepartment@gmail.com'); 
    cy.get('input[type="password"]').type('a'); 

    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 

    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Incorrect email or password');
  });

  it('Does error handling for not using a verified email', () => {
    // Visit the login page
    cy.visit('http://localhost:5000/#/login'); 
  
    // Type login info
    cy.get('input[type="email"]').type('test@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 

    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 

    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Verify your email before logging in');
  });
});