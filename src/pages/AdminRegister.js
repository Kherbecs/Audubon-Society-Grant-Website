import React from 'react'
import '../css/AdminLoginAndRegister.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

/*Register Page that uses React JS, HTML, CSS, and Bootstrap 5*/
const adminFirebaseConfig = {
    apiKey: "AIzaSyB0pkdIGT5RiCe5jPY2628O27X_sTk3Xn4",
    authDomain: "team-pwd-admin.firebaseapp.com",
    projectId: "team-pwd-admin",
    storageBucket: "team-pwd-admin.appspot.com",
    messagingSenderId: "445587795844",
    appId: "1:445587795844:web:9b1ed3d5902ddca9d577d1",
    measurementId: "G-0FLPMK8X2Z"
  };
  
  // Initialize Firebase for admins
  const adminApp = firebase.initializeApp(adminFirebaseConfig);
  console.log(adminApp);
  const database = getDatabase(adminApp);
  const adminAuth = adminApp.auth();

async function handleAdminRegistration() {
  const fullName = document.getElementById('full-name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  
  //Checks if email is valid
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Checks if password matches
  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  // Checks the password requirement
  else if((password.length < 6 || /\s/.test(password)) && !(password.trim() === '')) {
    alert('Password must be at least 6 characters long and not contain spaces.');
    return;
  }

  else if(password.trim() === '' && fullName.trim() === '' && confirmPassword.trim() === '' && email.trim() === '') {
    alert('Please fill out the registration form.');
    return;
  }

  else if(password.trim() === '') {
    alert('Please enter your password.');
    return;
  }

  else if(email.trim() === '') {
    alert('Please enter your email.');
    return;
  }

  else if (fullName.trim() === '') {
    alert('Please enter your full name.');
    return;
  }

  // Checks if the email is used 
  try {
    const signInMethods = await adminApp.auth().fetchSignInMethodsForEmail(email);
    if (signInMethods.length > 0) {
      alert('This email address is already registered.');
      return;
    }
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
  }
  
  // firebase creates the acc with the email and password
  adminAuth.createUserWithEmailAndPassword(email, password)
    .then(async (userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log(user);
      alert('Account successfully created! Please check your email for verification.');
      try {
        await adminAuth.currentUser.sendEmailVerification();
        // Email verification sent
        console.log('Email verification sent');

        // Write registration data to the Realtime Database
        const databaseAdmin = firebase.database(adminApp);
        const userId = user.uid;
        const userData = {
          fullName: fullName,
          email: email
        };
        databaseAdmin.ref('users/' + userId).set(userData)
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


export function AdminRegister() {
  return (
      <div className="wrapper-lr wrapper-padding-r">
        <div className="form-lr">

          <h2 className="mb-3 h2-lr">Admin Register</h2>
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

          <button className="btn btn-success btn-lg w-100 block mt-2" onClick={handleAdminRegistration}>Sign Up</button>

          <div className="link2-lr">
            Already have an account? <a href="/adminlogin" className="link-lr2">Sign in</a>
          </div>
        </div>
      </div>
  )
}