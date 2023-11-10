// NOTE THAT IF YOU ARE TESTING, MAKE SURE TO CHANGE THE PORT NUMBER BASED ON WHAT THE LINK GIVES YOU 
// WHEN YOU USE "npx firebase serve" COMMAND
describe('Register Function', () => {
    it('Error handling for empty fields', () => {
      // Visit the register page
      cy.visit('http://localhost:5000/#/register'); 
    
      // Click the register button
      cy.get('button').contains('Sign Up').click();
    
      // Checks error message
      cy.get('.error-message-lr').should('exist').and('have.text', 'Please fill out all fields');
    });
  
    it('Error handling for not typing the full name properly', () => {
        // Visit the register page
        cy.visit('http://localhost:5000/#/register'); 
            
        // Fills out form 
        cy.get('#full-name').type('John Doe1');
        cy.get('#email').type('johndoe@gmail.com');
        cy.get('#password').type('strongpassword');
        cy.get('#confirm-password').type('strongpassword');
        cy.get('#sign-up-for-grants').check();
    
        // Click the register button
        cy.get('button').contains('Sign Up').click();
      
        // Checks error message
        cy.get('.error-message-lr').should('exist').and('have.text', 'Please enter a valid full name');
      });  

    it('Error handling for not having the correct email format', () => {
      // Visit the register page
      cy.visit('http://localhost:5000/#/register'); 

      // Fills out form 
      cy.get('#full-name').type('John Doe');
      cy.get('#email').type('invalidemail');
      cy.get('#password').type('strongpassword');
      cy.get('#confirm-password').type('strongpassword');
      cy.get('#sign-up-for-grants').check();
  
      // Click the register button
      cy.get('button').contains('Sign Up').click();
    
      // Checks error message
      cy.get('.error-message-lr').should('exist').and('have.text', 'Please enter a valid email address');
    });
  
    it('Error handling for not having matching passwords', () => {
      // Visit the register page
      cy.visit('http://localhost:5000/#/register'); 
    
      // Fills out form 
      cy.get('#full-name').type('John Doe');
      cy.get('#email').type('invalidemail@gmail.com');
      cy.get('#password').type('strongpassword2');
      cy.get('#confirm-password').type('strongpassword');
      cy.get('#sign-up-for-grants').check();
  
      // Click the register button
      cy.get('button').contains('Sign Up').click();
    
      // Checks error message
      cy.get('.error-message-lr').should('exist').and('have.text', 'Passwords do not match');
    });
  
    it('Error handling for not following the password criteria', () => {
      // Visit the register page
      cy.visit('http://localhost:5000/#/register'); 
    
      // Fills out form 
      cy.get('#full-name').type('John Doe');
      cy.get('#email').type('invalidemail@gmail.com');
      cy.get('#password').type('a');
      cy.get('#confirm-password').type('a');
      cy.get('#sign-up-for-grants').check();
  
      // Click the register button
      cy.get('button').contains('Sign Up').click();
    
      // Checks error message
      cy.get('.error-message-lr').should('exist').and('have.text', 'Password must be at least 6 characters long and not contain spaces');
    });
  
    it('Error handling for using the same email', () => {
      // Visit the register page
      cy.visit('http://localhost:5000/#/register'); 
    
      // Fills out form 
      cy.get('#full-name').type('John Doe');
      cy.get('#email').type('pixelwondermentdepartment@gmail.com');
      cy.get('#password').type('aaaaaa');
      cy.get('#confirm-password').type('aaaaaa');
      cy.get('#sign-up-for-grants').check();
  
      // Click the register button
      cy.get('button').contains('Sign Up').click();
    
      // Checks error message
      cy.get('.error-message-lr').should('exist').and('have.text', 'This email address is already registered');
    });
  
    //Won't be automated testing the success message because once you register an account, you will need to verify and 
    //this is for just testing purposes anyways. The successful application message has already been tested through
    //manual testing
  });