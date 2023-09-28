import React from 'react'
import '../css/NavBar.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { getDatabase } from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

// User database config
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


//done is used so that the function can run onLoad but is only used once
//to check if 
let done = false;
onAuthStateChanged(auth, (currentUser) => {
  if (currentUser && !done) {
    //user is signed in
    done = true;
    return;
  } 
  else if(!currentUser && !done) {
    // User is signed out
    //hide the webpage if no viable user
    done = true;
    document.getElementById('navBarWrapper').style.visibility = "hidden";
    window.location.href = '/login';
    console.error(401);
    return;
  }
  return;
});

/*Navigation Bar that uses React JS, HTML, CSS, and Bootstrap 5*/

export function UserNavBar() {
  const history = useHistory(); 

  // Checks if it's a user account and if it is, it redirects them to login and signs out
  function handleLogOut () {
      signOut(auth).then(() => {
          console.log('Logout success');
          window.location.href = '/login';
      }).catch((error) => {
          console.error('Logout error:', error);
      });
  }

  return (
    <div class="navbar-div" id="navBarWrapper" onLoad="javascript:onAuthStateChanged(auth, auth.currentUser)">
        <nav class="navbar navbar-expand-lg sticky-top" id='navbar-custom'>
          <a class="navbar-brand" href="/">
            <img src="https://i.imgur.com/dLZACKu.png" alt="bird" class="nav-img"></img>
          </a>
          <a class="navbar-brand" href="/">
            <h3 class="title-header">San Joaquin Audubon Society</h3>
          </a>
           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="#navbarCollapse" aria-expanded="false">
             <span class="navbar-toggler-icon"></span>
           </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/">HOME</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" href="https://www.sanjoaquinaudubon.org/">ABOUT US</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" href="/grantselection">GRANTS AND SCHOLARSHIPS</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" href="/pastsubmissions">PAST SUBMISSIONS</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" href="/login" onClick={handleLogOut}>LOGOUT</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>     
  )
}