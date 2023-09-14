import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

/*Login Page for Admins that uses React JS, HTML, CSS, and Bootstrap 5*/
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
  const adminApp = firebase.initializeApp(adminFirebaseConfig, 'admin-app');
  console.log(adminApp);
  const databaseAdmin = getDatabase(adminApp);
  const adminAuth = adminApp.auth();

export function AdminForgotPassword() {
    function handlePasswordReset() {
        const email = document.getElementById('InputEmail1').value;
        
        if(email.trim() === '') {
          alert('Please enter your email.');
          return;
        }
        
        // Checks if email is valid
        if(!/\S+@\S+\.\S+/.test(email)) {
          alert('Please enter a valid email address.');
          return;
        }
        
        //Will send the password reset through email
        adminAuth.sendPasswordResetEmail(email)
        .then((userCredential) => {
          // Check if email is verified
          if (userCredential && userCredential.user && !userCredential.user.emailVerified) {
            alert('Email is not found.');
            firebase.auth().signOut();
            return;
          }
      
          // Redirect to home page
          alert('Reset link sent. Check email');          
          return;
        })
        .catch((error) => {
          alert('Account not found.');
          console.error(error);
        });
      }

  return (
    <div className="PasswordReset">
      <div className="passwordwrapper">
      
      <div class="form-password-containV2">
      <div class="imdivpassword">
        <img src="https://i.imgur.com/dLZACKu.png" alt="bird" class="responseimgV2" ></img>
      </div>
        
            <div class="wrapper-password-reset">
              <div class="containerty">
              <p className="head-text-password">Please enter the email associated with your account. You will get a link to reset your password</p>
                <div class="form-group w-100" >
                <input type="email" class="form-control justify-content-center" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                
                </div>
              </div>
            </div>
            <div class="containerty">
              <button type="sign in" className="btn btn-lr btn-success btn-lg w-100 block mt-2" onClick={() => handlePasswordReset()}>Submit</button>
            </div>
          <div class="containerty">
          <a href="/adminlogin" class="links-password ">Back</a>
          </div>
        
      </div>
      
      
      </div>
      </div> 
  );
}


