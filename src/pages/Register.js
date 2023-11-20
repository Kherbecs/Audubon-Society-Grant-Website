import React from 'react'
import '../css/LoginAndRegister.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCzdnLMAkegsr-zrw9O63Nlu6Ft_Urdw50",
  authDomain: "team-pwd.firebaseapp.com",
  projectId: "team-pwd",
  storageBucket: "team-pwd.appspot.com",
  messagingSenderId: "129648865838",
  appId: "1:129648865838:web:9713fb401ac09b481e25bf",
  measurementId: "G-6FM488KSS5"
};

// Initialize Firebase for users
const app = firebase.initializeApp(firebaseConfig, 'my-app');
console.log(app);
const database = getDatabase(app);
const auth = app.auth();

/*Register Page that uses React JS, HTML, CSS, and Bootstrap 5*/
async function handleRegistration() {
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const signUpForGrants = document.getElementById('sign-up-for-grants').checked;


  if(password.trim() === '' || fullName.trim() === '' || confirmPassword.trim() === '' || email.trim() === '') {
    document.getElementById('alert-message').textContent = 'Please fill out all fields';
    return;
  }

  const fullNameRegex = /^[A-Za-z\s]+$/;

  // Full name can only be using spaces and letters
  if (!fullNameRegex.test(fullName)) {
    document.getElementById('alert-message').textContent = 'Please enter a valid full name';
    return;
  }

  // Checks if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    document.getElementById('alert-message').textContent = 'Please enter a valid email address';
    return;
  }

  // Checks if password matches
  if (password !== confirmPassword) {
    document.getElementById('alert-message').textContent = 'Passwords do not match';
    return;
  }

  // Checks the password requirement
  if((password.length < 6 || /\s/.test(password)) && !(password.trim() === '')) {
    document.getElementById('alert-message').textContent = 'Password must be at least 6 characters long and not contain spaces';
    return;
  }

  // Checks if the email is used 
  try {
    const signInMethods = await auth.fetchSignInMethodsForEmail(email);
    if (signInMethods.length > 0) {
      document.getElementById('alert-message').textContent = 'This email address is already registered';
      return;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }

  // firebase creates the acc with the email and password
  auth.createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      alert('Account successfully created! Please check your email for verification.');
      try {
        await auth.currentUser.sendEmailVerification();
        // Email verification sent
        console.log('Email verification sent');

        // Write registration data to the Realtime Database
        const userDatabase = firebase.database(app);
        const userId = user.uid;
        const userData = {
          fullName: fullName,
          email: email,
          signUpForGrants: signUpForGrants
        };
        userDatabase.ref('users/' + userId).set(userData)
          .then(() => {
          console.log('Data successfully written to the database');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error writing data to the database: ', error);
        });
      } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}


export function Register() {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/login');
    window.location.reload();
  };

  return (
      <div className="wrapper-lr wrapper-padding-r">
        <div className="container">
          <div className="row justify-content-center">
            <div className="form-lr">

              <h2 className="mb-3 h2-lr">Register</h2>
              <hr className="hr-lr"/>

              <div className="form-floating mb-2">
                <input type="full-name" className="form-control form-control-lg" id="full-name" placeholder="Full Name"></input>
                <label htmlFor="full-name">Full Name</label>
              </div>

              <div className="form-floating mb-2">
                <input type="email" className="form-control form-control-lg" id="email" placeholder="Email Address"></input>
                <label htmlFor="email">Email Address</label>
              </div>

              <div className="form-floating mb-2">
                <input type="password" className="form-control form-control-lg" id="password" placeholder="Password"></input>
                <label htmlFor="password">Password</label>
                <div id="passwordHelpBlock" class="form-text-lr">
                  Must be 6 characters long and not contain spaces
                </div>
              </div>

              <div className="form-floating mb-2">
                <input type="password" className="form-control form-control-lg" id="confirm-password" placeholder="Confirm Password"></input>
                <label htmlFor="confirm-password">Confirm Password</label>
              </div>
              
              <div className="form-group form-check mb-2">
                <input type="checkbox" className="form-check-input" id="sign-up-for-grants"></input>
                <label htmlFor="sign-up-for-grants" className="form-check-label-lr">Sign Up for Grant Updates</label>
              </div>

              <div className="error-message-lr" id="alert-message">
              </div>

              <button className="btn btn-success btn-lg w-100 block mt-2" onClick={handleRegistration}>Sign Up</button>

              <div className="link2-lr">
                Already have an account? <Link className="link-lr2" onClick={handleLoginClick}>Sign in</Link>
              </div>
          </div>
        </div> 
      </div>
    </div>
  )
}
