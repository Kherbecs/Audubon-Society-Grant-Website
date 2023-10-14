import { React, useEffect, useState } from 'react'
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
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';

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

/*Navigation Bar that uses React JS, HTML, CSS, and Bootstrap 5*/

export function UserNavBar() {
  const history = useHistory();

  const handleHomeClick = () => {
    history.push('/');
    window.location.reload();
  };

  const handleGrantClick = () => {
    history.push('/grantselection');
    window.location.reload();
  };

  const handlePastClick = () => {
    history.push('/pastsubmissions');
    window.location.reload();
  };

  useEffect(() => {
      let done = false;
      onAuthStateChanged(auth, (currentUser) => {
          if (currentUser && !done) {
              // User is signed in, do nothing
              done = true;
          } else if (!currentUser && !done) {
              // User is signed out
              done = true;
              document.getElementById('navBarWrapper').style.visibility = "hidden";
              history.push('/login'); 
              window.location.reload();
              console.error(401);
              return;
          }
      });
  }, [auth, history]); 

  // Checks if it's a user account and if it is, it redirects them to login and signs out
  function handleLogOut () {
      signOut(auth).then(() => {
          console.log('Logout success');
          history.push('/login'); 
          window.location.reload();
      }).catch((error) => {
          console.error('Logout error:', error);
      });
  }

  return (
    <div class="navbar-div" id="navBarWrapper" onLoad="javascript:onAuthStateChanged(auth, auth.currentUser)">
        <nav class="navbar navbar-expand-lg sticky-top" id='navbar-custom'>
          <Link class="navbar-brand" onClick={handleHomeClick}>
            <img src="https://i.imgur.com/dLZACKu.png" alt="bird" class="nav-img"></img>
          </Link>
          <Link class="navbar-brand" onClick={handleHomeClick}>
            <h3 class="title-header">San Joaquin Audubon Society</h3>
          </Link>
           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="#navbarCollapse" aria-expanded="false">
             <span class="navbar-toggler-icon"></span>
           </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                  <Nav.Item>
                    <Nav.Link onClick={handleHomeClick}>HOME</Nav.Link>
                  </Nav.Item>
                    <li class="nav-item">
                       <a class="nav-link" href="https://www.sanjoaquinaudubon.org/">ABOUT US</a>
                    </li>
                  <Nav.Item>
                    <Nav.Link onClick={handleGrantClick}>GRANTS AND SCHOLARSHIPS</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={handlePastClick}>PAST SUBMISSIONS</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link onClick={handleLogOut}>LOGOUT</Nav.Link>
                  </Nav.Item>
                </ul>
            </div>
        </nav>
    </div>     
  )
}
