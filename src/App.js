import { HashRouter as Router, BrowserRouter as BrowserRouterRouter, Switch, Route } from "react-router-dom";
import { NavBar } from "./pages/NavBar.js";
import { Footer } from './pages/Footer.js';
import { LandingPage } from './pages/LandingPage.js';
import { Login } from './pages/Login.js';
import { Register } from './pages/Register';
import { PasswordReset } from './pages/PasswordReset.js';
import { GrantSelection } from './pages/GrantSelection.js';
import { AdminPortal } from './pages/AdminPortal.js';
import { ApplicationFormPage } from './pages/ApplicationFormPage.js';
import { PastSubmissions } from './pages/PastSubmissions.js';
import { SubAppForm } from './pages/SubAppForm.js';
import { AdminSubAppForm } from './pages/AdminSubAppForm.js';
import { UserNavBar } from './pages/UserNavBar.js';
import { AdminLogin } from './pages/AdminLogin.js';
import { AdminForgotPassword } from './pages/AdminForgotPassword.js';
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from 'firebase/database';
import React, { useState, useEffect } from 'react';
import { AdminSubAppForm2 } from './pages/AdminSubAppForm2.js';
import { SubAppForm2 } from "./pages/SubAppForm2.js";
import { ApplicationFormPage2 } from './pages/ApplicationFormPage2.js'; 
import PageNotFound from './pages/PageNotFound.js'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

// Admin database config
const adminFirebaseConfig = {
  apiKey: "AIzaSyB0pkdIGT5RiCe5jPY2628O27X_sTk3Xn4",
  authDomain: "team-pwd-admin.firebaseapp.com",
  projectId: "team-pwd-admin",
  storageBucket: "team-pwd-admin.appspot.com",
  messagingSenderId: "445587795844",
  appId: "1:445587795844:web:9b1ed3d5902ddca9d577d1",
  measurementId: "G-0FLPMK8X2Z"
};

// Initialize Firebase for users
const app = firebase.initializeApp(firebaseConfig, 'my-app');
console.log(app);
const database = getDatabase(app);
const auth = app.auth();

// Initialize Firebase for admins
const adminApp = firebase.initializeApp(adminFirebaseConfig);
console.log(adminApp);
const adminAuth = adminApp.auth();

function App() {
  // Tracking the user authentication
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  // Checks the user authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // Checks if user is logged in or not
      if (user) {
        setUserLoggedIn(true);
      } 
      
      else {
        setUserLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);

  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserLoggedIn(true);
        setEmailVerified(user.emailVerified); // Set email verified state
      } else {
        setUserLoggedIn(false);
        setEmailVerified(false);
      }
    });
  
    return unsubscribe;
  }, []);

  return (
    <div>
    <Router>
      <Route
        render={({ location }) =>
          location.pathname === '/pastsubmissions' ||
          location.pathname === '/grantselection' ? (
            <UserNavBar />
          ) : null
        }
      />
      <Switch>
        <Route exact path="/">
          {(userLoggedIn && emailVerified) ? <UserNavBar /> : <NavBar />}
          <LandingPage></LandingPage>
        </Route>
        <Route exact path="/login">
          {(userLoggedIn && emailVerified) ? <UserNavBar /> : <NavBar />}
          <Login></Login>
        </Route>
        <Route exact path="/register">
          {(userLoggedIn && emailVerified) ? <UserNavBar /> : <NavBar />}
          <Register></Register>
        </Route>
        <Route exact path="/passwordreset">
          <PasswordReset></PasswordReset>
        </Route>
        <Route exact path="/grantselection">
          <GrantSelection></GrantSelection>
        </Route>
        <Route exact path="/adminportal">
          <AdminPortal></AdminPortal>
        </Route>
        <Route exact path="/applicationformpage">
          <ApplicationFormPage></ApplicationFormPage>
        </Route>
        <Route exact path="/pastsubmissions">
          <PastSubmissions></PastSubmissions>
        </Route>
        <Route exact path="/h_59G0s9m_ftZZFqhTF2UwcnyDkNX4L3Z909CutD88">
          <AdminSubAppForm></AdminSubAppForm>
        </Route>
        <Route exact path="/subappform">
          <SubAppForm></SubAppForm>
        </Route>
        <Route exact path="/adminlogin">
          <AdminLogin></AdminLogin>
        </Route>
        <Route exact path="/adminforgotpassword">
          <AdminForgotPassword></AdminForgotPassword>
        </Route>
        <Route exact path="/4Bz2idqfUTyg9nVXPUqCxdyZ1ri3MiZZMtiQf">
          <AdminSubAppForm2></AdminSubAppForm2>
        </Route>
        <Route exact path="/subappform2">
          <SubAppForm2></SubAppForm2>
        </Route>
        <Route exact path="/applicationformpage2">
          <ApplicationFormPage2></ApplicationFormPage2>
        </Route> 
        <Route exact path ="*">
          <PageNotFound></PageNotFound>
        </Route>
      </Switch>
      <Route
        render={({ location }) =>
          location.pathname === '/' ||
          location.pathname === '/login' ||
          location.pathname === '/register' ||
          location.pathname === '/grantselection' ||
          location.pathname === '/pastsubmissions' ? (
            <Footer />
          ) : null
        }
      />
    </Router>
    <BrowserRouterRouter>
          <Switch>
            <Route exact path ="*">
            </Route>
          </Switch>
        </BrowserRouterRouter>
    </div>
  );
}

export default App;