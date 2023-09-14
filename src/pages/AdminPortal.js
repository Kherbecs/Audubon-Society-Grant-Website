import react from 'react'
import '../css/AdminPortal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";


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

//done is used so that the function can run onLoad but is only used once
//to check if 
let done = false;
onAuthStateChanged(adminAuth, (currentUser) => {
  if (currentUser && !done) {
    //admin user is signed in
    done = true;
    return;
  } 
  else if(!currentUser && !done) {
    // User is signed out
    //hide the webpage if no viable admin user
    done = true;
    document.getElementById('adminPortalWrapper').style.visibility = "hidden";
    window.location.href = '/';
    console.error(401);
    return;
  }
  return;
});

export function AdminPortal() {    
    return (
   
    <div class="wrapper-admin-portal" id="adminPortalWrapper" onLoad="javascript:onAuthStateChanged(adminAuth, adminAuth.currentUser)">
         
         <a href="/adminlogin"><button class="logout">Logout</button></a>
        <p class="fs-1 adminportal-heading">
            <p class="text-center">Current Applicants</p>
            <p class="text-end">
                <p class="fs-6">
                </p>
            </p>
        </p>
        <div class="row g-2">
            <div class="col-md col-md-admin1">
                <div class="form-floating form-floating-custom">
                    <select class="form-select form-admin" id="floatingSelect" aria-label="Filter drop down menu">
                        <option selected>Filter by grant, date, read/unread</option>
                        <option value="grant">grant 1</option>
                        <option value="grant2">grant 2</option>
                        <option value="date">date</option>
                        <option value="read">read</option>
                        <option value="unread">unread</option>
                    </select>
                </div>
            </div>
        
            <div class="col-md col-md-admin2">
                <div class="mb-3 search-bar search-admin">
                    <div class="searchField">
                        <input type="name" class="form-control" id="searchBar" placeholder="Search for applicants"></input> 
                        <button class="search">Search</button>
                    </div>
                </div>
            </div>
            
            
            
        </div>
        <div class="submissions-box">
                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>

                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>
                
                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>

                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>

                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>

                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>
            </div>
    </div>
    )
  }