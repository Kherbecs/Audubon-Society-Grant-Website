import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NavBar } from "./pages/NavBar.js";
import { Footer } from './pages/Footer.js';
import { LandingPage } from './pages/LandingPage.js';
import { Login } from './pages/Login.js';
import { Register } from './pages/Register';
import { PasswordReset } from './pages/PasswordReset.js';
import { ResetSuccess } from './pages/ResetSuccess.js';
import { GrantSelection } from './pages/GrantSelection.js';
import { AdminPortal } from './pages/AdminPortal.js';
import { ApplicationFormPage } from './pages/ApplicationFormPage.js';
import { PastSubmissions } from './pages/PastSubmissions.js';
import { PasswordChange } from './pages/PasswordChange.js';
import { PasswordFullReset } from './pages/PasswordFullReset.js';
import { SubAppForm } from './pages/SubAppForm.js';
import { AdminSubAppForm } from './pages/AdminSubAppForm.js';

function App() {
  return (
    <Router>
      <NavBar></NavBar>
      <Switch>
        <Route exact path="/">
          <LandingPage></LandingPage>
        </Route>
        <Route exact path="/login">
          <Login></Login>
        </Route>
        <Route exact path="/register">
          <Register></Register>
        </Route>
        <Route exact path="/passwordreset">
          <PasswordReset></PasswordReset>
        </Route>
        <Route exact path="/resetsuccess">
          <ResetSuccess></ResetSuccess>
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
        <Route exact path="/adminsubappform">
          <AdminSubAppForm></AdminSubAppForm>
        </Route>
        <Route exact path="/passwordchange">
          <PasswordChange></PasswordChange>
        </Route>
        <Route exact path="/passwordfullreset">
          <PasswordFullReset></PasswordFullReset>
        </Route>
        <Route exact path="/subappform">
          <SubAppForm></SubAppForm>
        </Route>
      </Switch>
      <Footer></Footer>
    </Router>
  );
}

export default App;