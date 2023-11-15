import React, { useCallback, useEffect, useRef, useState } from "react";
import '../css/PastSubmissions.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, onValue, ref, set, query, orderByChild, equalTo, get, child, DataSnapshot } from 'firebase/database';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { render } from "@testing-library/react";
import { SubAppForm } from "./SubAppForm";
import { Link } from 'react-router-dom';

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
    else if (!currentUser && !done) {
        // User is signed out
        //hide the webpage if no viable user
        done = true;
        document.getElementById('pastSubmissionsWrapper').style.visibility = "hidden";
        window.location.href = '/login';
        console.error(401);
        return;
    }
    return;
});


export function PastSubmissions() {
    const history = useHistory();

    const handleGrantClick = () => {
        history.push('/grantselection');
        window.location.reload();
    };


    const handleSubAppForm = (applicationName) => {
        if(applicationName === 'Steve Stocking') {
            history.push('/subappform');
            window.location.reload();
        } else if(applicationName === 'Environmental Education and Citizen Science') {
            history.push('/subappform2');
            window.location.reload();
        }
    }

    useEffect(() => {
        let done = false;
        onAuthStateChanged(auth, (user) => {
          if (user && !done) {
            // Check if the user's email is verified
            if (user.emailVerified) {
              // Email is verified, user can access this part of the app
              done = true;
            } else {
              history.push('/login');
              window.location.reload();
            }
          } else if (!user && !done) {
            // User is not authenticated, redirect to login
            history.push('/login');
            window.location.reload();
          }
        });
      }, [auth, history]);

    const [userID, setUserID] = useState(null);


    function GetUserId() {

        useEffect(() => {
            const unsub = auth.onAuthStateChanged((authObj) => {
                unsub();
                if (authObj) {
                    console.log("User ID stored:", authObj.uid);
                    setUserID(authObj.uid); // Set the userID state
                } else {
                    console.log("User not logged in.");
                }
            });
        }, []);

        return (
            <div>
                <p>User ID: {userID}</p>
            </div>
        );
    }

    async function parsePastSubmissions() {
        try {
            let userSubs = [];
            const nodeRef = ref(database, "users/" + userID + "/forms");

            const snapshot = await get(nodeRef);
    
            snapshot.forEach((childSnapshot) => {
                if(childSnapshot.key !== "_LockStatus") {
                    const childData = childSnapshot.val();
                    userSubs.push(childData);
                }
            });

            return userSubs;
        } catch (error) {
            console.error("Error getting data: ", error);
            return [];
        }
    }

    function PopulateSubmissions(category) {

        const [submissions, setSubmissions] = useState(() => {

            const storedData = localStorage.getItem('submissions');
            console.log("testing data:" + storedData);
            return storedData ? JSON.parse(storedData) : [];
        });


        useEffect(() => {
            const fetchAndSetData = async () => {
                try {
                    const currData = await parsePastSubmissions();

                    setSubmissions(currData);

                    localStorage.setItem("submissions", JSON.stringify(currData));
                } catch (error) {
                    console.error("Error fetching and setting: ", error);
                }
            };
            localStorage.clear();
            if (submissions.length === 0)
                fetchAndSetData();
            console.log(localStorage);
        }, [submissions]);

        // stores original statuses of the applications before any changes
        // everything is remapped on function call (every time page is refreshed)
        var originalStatuses = [];
        submissions.map((app, key) => (
            // INDEX 0 IS ENVIRON EDUCATIONAL APP, 1 IS STEVE STOCKING
            originalStatuses[key] = app._GrantStatus
        ));

        // creates listeners for both grant statuses, and refreshes the pages if the value is changed accordingly
        // quality of life feature for the user
        
        const environEducStatus = ref(database,'users/'+ userID +'/forms/EnvironmentalEducation_CitizenScience/' + '_GrantStatus');
        onValue(environEducStatus, (snapshot) => {
            var originalVal = originalStatuses[0];
            var newVal = snapshot.val();
            if (originalVal != null && newVal != null && originalVal != newVal){
                window.location.reload();
            }
        })

        const steveStockingStatus = ref(database,'users/'+ userID +'/forms/steve_stocking/' + '_GrantStatus');
        onValue(steveStockingStatus, (snapshot) => {
            var originalVal = originalStatuses[1];
            var newVal = snapshot.val();
            if (originalVal != null && newVal != null && originalVal != newVal ){
               window.location.reload();
            }

        })



        switch (category) {
            case "applications":
                return (
                    submissions.map((app, index) => (
                        <Link onClick={() => handleSubAppForm(app._GrantName)}  class="btn btn-success m-2 applications" key={index}>
                            <div key={index}>{app._GrantName}</div>
                        </Link>
                    ))
                );

            case "status":
                return (
                    submissions.map((stat, index) => (
                        <div class="btn btn m-2 order-2 disabled app-status" key={index}>{stat._GrantStatus}</div>
                    ))
                );

            case "submitted":
                return (
                    submissions.map((date, index) => (
                        <div class="p-1 m-2 disabled date-submitted" key={index}>{date._DateSubmitted}</div>
                    ))
                );

            case "mobileApplications":
                return (

                    submissions.map((app, index) => (
                        <div key={index} class="row justify-content-center">
                            <Link onClick={() => handleSubAppForm(app._GrantName)} class="btn btn-success m-6 applications" key={index}>
                            <div key={index}>{app._GrantName}</div>
                            </Link>

                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress" key={index}>{app._GrantStatus}</div>

                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted {app._DateSubmitted}
                            </div>
                            <hr className="mobile-applications-hr" />
                        </div>

                    ))
                );

            default:
                break;
        }

    }

    GetUserId();
    console.log(localStorage);

    return (
        <div class="flex-wrap page-content" id="pastSubmissionsWrapper" onLoad="javascript:onAuthStateChanged(auth, auth.currentUser)">

            <div class="mx-auto text-center page-title">
                <h1 class="past-submissions-title">Past Submissions</h1>
            </div>
            <div class="col">
                <Link class="btn btn-nav btn-sm btn-success back-to-grants" onClick={handleGrantClick}>Back</Link>
            </div>
            <div class="container-fluid container-content">
                <div class="col-8 card submission-body">
                    <div class="card-body row main-card desktop-apps">
                        <div class="vstack col-xl-6 col-lg-5 col-md-5 col-sm-6 applications-stack">
                            <h4>Applications</h4>
                            <hr className="hr-past-submissions" />
                            {PopulateSubmissions("applications")}
                        </div>

                        <div class="vstack col-xl-4 col-lg-4 col-md-4 col-sm-3  status-stack">
                            <h4 class="mobile-hide">Status</h4>
                            <hr className="hr-past-submissions mobile-hide" />
                            {PopulateSubmissions("status")}
                        </div>

                        <div class="vstack col-xl-2 col-lg-3 col-md-3 col-sm-3 date-submitted-stack">
                            <h4 class="mobile-hide">Submitted</h4>
                            <hr className="hr-past-submissions mobile-hide" />
                            {PopulateSubmissions("submitted")}
                        </div>
                    </div>

                    <div class="container-fluid card-body row main-card mx-auto mobile-apps btn-toolbar">
                        <h4>Applications</h4>
                        <hr className="mobile-applications-hr" />
                        {PopulateSubmissions("mobileApplications")}
                    </div>
                </div>
            </div>
        </div>
    )
}
