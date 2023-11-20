import React from 'react'
import '../css/LoginAndRegister.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import { Link } from 'react-router-dom';

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
const analytics = getAnalytics(app);
console.log(app);
const database = getDatabase(app);
const auth = app.auth();

/*Login Page that uses React JS, HTML, CSS, and Bootstrap 5*/

export function Login() {
  const history = useHistory();

  const handleRegisterClick = () => {
    history.push('/register');
    window.location.reload();
  };

  const handleAdminLoginClick = () => {
    history.push('/adminlogin');
    window.location.reload();
  };

  const handlePasswordClick = () => {
    history.push('/passwordreset');
    window.location.reload();
  };

  function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(password.trim() === '' && email.trim() === '') {
      document.getElementById('alert-message').textContent = 'Please fill out the form';
      return;
    }
  
    else if(password.trim() === '') {
      document.getElementById('alert-message').textContent = 'Please enter your password';
      return;
    }
  
    else if(email.trim() === '') {
      document.getElementById('alert-message').textContent = 'Please enter your email';
      return;
    }
    
    // Signing in with the user account
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Check if email is verified
      if (!userCredential.user.emailVerified) {
        document.getElementById('alert-message').textContent = 'Verify your email before logging in';

        return;
      }
      
      // Redirect to the grantselection page
      history.push('/grantselection');
      window.location.reload();
    })
    .catch((error) => {
      // Handle incorrect password or email
      document.getElementById('alert-message').textContent = 'Incorrect email or password';
      console.error(error);
    });
  }

  return (
    <html>
      <div className="wrapper-lr wrapper-padding-l">
        <div className="container">
          <div className="row justify-content-center">
              <div className="form-lr">
                <h2 className="mb-3 h2-lr">Login</h2>
                <hr className="hr-lr"/>

                <div className="form-floating mb-2">
                  <input type="email" className="form-control form-control-lg" id="email" placeholder="Email Address"></input>
                  <label htmlFor="email">Email Address</label>
                </div>

                <div className="form-floating mb-2">
                  <input type="password" className="form-control form-control-lg" id="password" placeholder="Password"></input>
                  <label htmlFor="password">Password</label>
                </div>

                <div className="error-message-lr" id="alert-message">
                </div>

                <div className="link1-lr">
                <Link className="link-lr2" onClick={handlePasswordClick}>Forgot password?</Link>
                </div>
                <button type="button" className="btn btn-lr btn-success btn-lg w-100 block mt-2" onClick={handleLogin}>Sign In</button>
                <div className="link2-lr">
                  Need an account? <Link className="link-lr2" onClick={handleRegisterClick}>Sign up</Link>
                </div>
                <div className="link2-lr">
                  <Link className="link-lr2" onClick={handleAdminLoginClick}>Admin Login</Link>
                </div>
              </div>
            </div>
          </div>
      </div>  
    </html>
  )
}