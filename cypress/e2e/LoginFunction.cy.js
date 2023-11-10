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


/*
// Very similar to the Admin Register function, won't need unit testing since it's good
describe('Register Function', () => {
  it('Error handling for empty fields', () => {
    // Visit the register page
    cy.visit('http://localhost:3000/register'); 
  
    // Click the register button
    cy.get('button').contains('Sign Up').click();
  
    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Please fill out all fields');
  });

  it('Error handling for not having the correct email format', () => {
    // Visit the register page
    cy.visit('http://localhost:3000/register'); 
  
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
    cy.visit('http://localhost:3000/register'); 
  
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
    cy.visit('http://localhost:3000/register'); 
  
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
    cy.visit('http://localhost:3000/register'); 
  
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

  it('Error handling for empty full name field', () => {
    // Visit the register page
    cy.visit('http://localhost:3000/register'); 
  
    // Fills out form 
    cy.get('#email').type('invalidemail@gmail.com');
    cy.get('#password').type('aaaaaa');
    cy.get('#confirm-password').type('aaaaaa');
    cy.get('#sign-up-for-grants').check();

    // Click the register button
    cy.get('button').contains('Sign Up').click();
  
    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Please enter your full name');
  });

  it('Error handling for empty email field', () => {
    // Visit the register page
    cy.visit('http://localhost:3000/register'); 
  
    // Fills out form 
    cy.get('#full-name').type('John Doe');
    cy.get('#password').type('aaaaaa');
    cy.get('#confirm-password').type('aaaaaa');
    cy.get('#sign-up-for-grants').check();

    // Click the register button
    cy.get('button').contains('Sign Up').click();
  
    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Please enter your email');
  });

  it('Error handling for password field', () => {
    // Visit the register page
    cy.visit('http://localhost:3000/register'); 
  
    // Fills out form 
    cy.get('#email').type('invalidemail@gmail.com');
    cy.get('#full-name').type('John Doe');
    cy.get('#confirm-password').type('aaaaaa');
    cy.get('#sign-up-for-grants').check();

    // Click the register button
    cy.get('button').contains('Sign Up').click();
  
    // Checks error message
    cy.get('.error-message-lr').should('exist').and('have.text', 'Please enter your password');
  });

  //Won't be testing the success message because once you register an account, you will need to verify and 
  //this is for just testing purposes anyways. The successful application message has already been tested.
});

describe('User Application Form Error Handling', () => {
  it('Error handling for when the user already submitted a form', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('pixelwondermentdepartment@gmail.com'); 
    cy.get('input[type="password"]').type('teampwd'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', "You already submitted a form. You can't resubmit. Please contact one of the admins in order to edit your submission.");
  });

  it('Error handling for empty fields', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'Please fill out all fields');
  });

  it('Error handling for filling out the form and not using the correct email format', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('1/1/1998');
    cy.get('#email').type('a');
    cy.get('#phone').type('a');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City');
    cy.get('#state').type('CA');
    cy.get('#zip').type('a');
    cy.get('#q1').select('Select');
    cy.get('#q2').select('Select');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'Please enter a valid email address');
  });

  it('Error handling for filling out the form and not using the correct bday format', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('a');
    cy.get('#email').type('a');
    cy.get('#phone').type('a');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City');
    cy.get('#state').type('CA');
    cy.get('#zip').type('a');
    cy.get('#q1').select('Select');
    cy.get('#q2').select('Select');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'Please enter a valid birthday in the format "xx/xx/xxxx"');
  });

  it('Error handling for filling out the form and not using the correct phone number format', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('1/1/1998');
    cy.get('#email').type('a@gmail.com');
    cy.get('#phone').type('a');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City');
    cy.get('#state').type('CA');
    cy.get('#zip').type('a');
    cy.get('#q1').select('Select');
    cy.get('#q2').select('Select');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'Phone number should contain only numbers');
  });

  it('Error handling for filling out the form and not using characters for first name or/and last name', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('1');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('1/1/1998');
    cy.get('#email').type('a@gmail.com');
    cy.get('#phone').type('a');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City');
    cy.get('#state').type('CA');
    cy.get('#zip').type('a');
    cy.get('#q1').select('Select');
    cy.get('#q2').select('Select');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'First Name and Last Name should contain only letters');
  });

  it('Error handling for filling out the form and not using characters for city and state', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('1/1/1998');
    cy.get('#email').type('a@gmail.com');
    cy.get('#phone').type('9167838283');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City1');
    cy.get('#state').type('CA');
    cy.get('#zip').type('a');
    cy.get('#q1').select('Select');
    cy.get('#q2').select('Select');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'City and State should contain only letters');
  });

  it('Error handling for filling out the form and not using numbers for zip code', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('1/1/1998');
    cy.get('#email').type('a@gmail.com');
    cy.get('#phone').type('9167838283');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City');
    cy.get('#state').type('CA');
    cy.get('#zip').type('a');
    cy.get('#q1').select('Select');
    cy.get('#q2').select('Select');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'ZIP Code should contain only numbers');
  });

  it('Error handling for not selecting if they are a member of the San Joaquin Audubon Society or not', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('1/1/1998');
    cy.get('#email').type('a@gmail.com');
    cy.get('#phone').type('9167838283');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City');
    cy.get('#state').type('CA');
    cy.get('#zip').type('957');
    cy.get('#q1').select('Select');
    cy.get('#q2').select('Yes');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'Please select if you are a member of the San Joaquin Audubon Society or not');
  });

  it('Error handling for not selecting if they live in San Joaquin County or not', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('1/1/1998');
    cy.get('#email').type('a@gmail.com');
    cy.get('#phone').type('9167838283');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City');
    cy.get('#state').type('CA');
    cy.get('#zip').type('957');
    cy.get('#q1').select('No');
    cy.get('#q2').select('Select');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'Please select if you live in San Joaquin County or not');
  });

  it('Error handling for not selecting any of the dropdown menus', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
    
    // Type login info
    cy.get('input[type="email"]').type('rishimail2791@gmail.com'); 
    cy.get('input[type="password"]').type('test123'); 
    
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
    
    // Click the apply button in the grant selection
    cy.contains('Apply', { timeout: 10000 }).click(); 

    // Filling out the form
    cy.get('#fname').type('John');
    cy.get('#lname').type('Doe');
    cy.get('#birthday').type('1/1/1998');
    cy.get('#email').type('a@gmail.com');
    cy.get('#phone').type('9167838283');
    cy.get('#address').type('123 Main St');
    cy.get('#city').type('Sample City');
    cy.get('#state').type('CA');
    cy.get('#zip').type('957');
    cy.get('#q1').select('Select');
    cy.get('#q2').select('Select');
    cy.get('#q3').type('I want to attend the Birdwatching Camp.');
    cy.get('#q4').type('No additional comments.');

    // Click the submit button to submit the form
    cy.contains('Submit', { timeout: 10000 }).click(); 

    // Check error message 
    cy.get('.error-message').should('exist').and('have.text', 'Please select either yes or no in the dropdown menu');
  });

  //Won't be testing the success message because once you submit a successful application, you won't be able to resubmit and 
  //this is for just testing purposes anyways. The successful application message has already been tested.
}); 


describe('Logout Function', () => {
  it('Logs out from adminportal using the button and redirects to adminlogin', () => {
    // Visit adminportal
    cy.visit('http://localhost:3000/#/adminportal') // Adjust this URL as needed

    // Click the logout button
    cy.get('.logout').click();

    // Redirects to adminlogin
    cy.url().should('include', 'http://localhost:3000/#/adminlogin');
  });

  it('Logs out from grantselection using the usernavbar and redirects to login', () => {
    // Visit grantselection
    cy.visit('http://localhost:3000/grantselection'); 

    // Makes sure that the logout is in the nav bar
    cy.get('a.nav-link').contains('LOGOUT').should('be.visible');

    // Click the logout link
    cy.get('a.nav-link').contains('LOGOUT').click();

    // Redirects to login
    cy.url().should('include', 'http://localhost:3000/login'); 
  });

  it('Logs out from pastsubmissions using the usernavbar and redirects to login', () => {
    // Visit pastsubmissions
    cy.visit('http://localhost:3000/pastsubmissions');

    // Makes sure that the logout is in the nav bar
    cy.get('a.nav-link').contains('LOGOUT').should('be.visible');

    // Click the logout link
    cy.get('a.nav-link').contains('LOGOUT').click();

    // Redirects to login
    cy.url().should('include', 'http://localhost:3000/login'); 
  });

  it('Logs out from home page as a login user and redirects to login', () => {
    // Visit the login page
    cy.visit('http://localhost:3000/login'); 
  
    // Type login info
    cy.get('input[type="email"]').type('pixelwondermentdepartment@gmail.com'); 
    cy.get('input[type="password"]').type('teampwd'); 
  
    // Click the login button
    cy.get('button[type="button"]').contains('Sign In').click(); 
  
    // Redirect to grantselection page 
    cy.url().should('include', 'http://localhost:3000/grantselection'); 

    // Redirect to home page
    cy.visit('http://localhost:3000/');

    // Makes sure that the logout is in the nav bar
    cy.get('a.nav-link').contains('LOGOUT').should('be.visible');

    // Click the logout link
    cy.get('a.nav-link').contains('LOGOUT').click();
    
    // Redirects to login
    cy.url().should('include', 'http://localhost:3000/login'); 
  });
});*/