import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { getDatabase } from 'firebase/database';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const firebaseConfig = {
  apiKey: "AIzaSyCzdnLMAkegsr-zrw9O63Nlu6Ft_Urdw50",
  authDomain: "team-pwd.firebaseapp.com",
  projectId: "team-pwd",
  storageBucket: "team-pwd.appspot.com",
  messagingSenderId: "129648865838",
  appId: "1:129648865838:web:9713fb401ac09b481e25bf",
  measurementId: "G-6FM488KSS5"
};


const app = firebase.initializeApp(firebaseConfig, 'my-app');
console.log(app);
const database = getDatabase(app);
const  auth= app.auth();


export function PasswordReset() {
  const history = useHistory();

  const handleLoginClick = () => {
    history.push('/login');
    window.location.reload();
  };

  function passwordUserReset(){
    
    const userEmail = document.getElementById('InputEmail1').value;
    if(userEmail===''){
      //alert('Enter a vaild email')
      document.getElementById('alert-message').textContent = 'Please enter your email';
      return;
    } else if(!/\S+@\S+\.\S+/.test(userEmail)){
      document.getElementById('alert-message').textContent = 'Please enter a valid email address';
      return;
    }
    sendPasswordResetEmail(auth,userEmail)
    .then((userCredential) => {
      if (userCredential && userCredential.user && !userCredential.user.emailVerified) {
        //alert('Email is not found.');
        document.getElementById('alert-message').textContent = 'Email is not found';
        firebase.auth().signOut();
        return;
      }
      alert('Reset link sent. Please check your email.');
      window.location.reload();
    })
    .catch((error) => {
      document.getElementById('alert-message').textContent = 'Account not found';
      //alert('Account not found.');
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

            <div className="error-message-pr" id="alert-message">
            </div>

            <div class="containerty">
              <a  className="links-password"><button type="sign in" className="btn btn-lr btn-success btn-lg w-100 block mt-2" onClick={()=>passwordUserReset()}>Submit</button></a>
            </div>
          <div class="containerty">
          <Link className="links-password" onClick={handleLoginClick}>Back</Link>
          </div>
        
      </div>
      
      
      </div>
      </div> 
  );
}

