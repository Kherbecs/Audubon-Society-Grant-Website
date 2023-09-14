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

export function AdminLogin() {
  const history = useHistory();
  function handleAdminLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(password.trim() === '' && email.trim() === '') {
      alert('Please fill out the form.');
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

    // Signing in with the user account
    adminAuth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        alert('Please verify your email before logging in.');
        firebase.auth().signOut();
        return;
      }
  
      // Redirect to admin page
      window.location.href = '/adminportal';
    })
    .catch((error) => {
      // Handle incorrect password or email
      alert('Incorrect email or password.');
      console.error(error);
    });
  }

  return (
    <html>
      <div className="wrapper-lr wrapper-padding-l">
        <div className="form-lr">
          <h2 className="mb-3 h2-lr">Admin Login</h2>
          <hr className="hr-lr"/>

          <div className="form-floating mb-2">
            <input type="email" className="form-control form-control-lg" id="email" placeholder="Email Address"></input>
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="form-floating mb-2">
            <input type="password" className="form-control form-control-lg" id="password" placeholder="Password"></input>
            <label htmlFor="password">Password</label>
          </div>

          <div className="link1-lr">
            <a href="/adminforgotpassword" className="link-lr2">Forgot password?</a>
          </div>
          <button type="button" className="btn btn-lr btn-success btn-lg w-100 block mt-2" onClick={handleAdminLogin}>Sign In</button>
          <div className="link2-lr">
            Need an account? <a class="one" href="/adminregister" className="link-lr2">Sign up</a>
          </div>
  
        </div>
      </div>
    </html>
  )
}