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
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && !done) {
                // User is signed in, do nothing
                done = true;
            } else if (!currentUser && !done) {
                // User is signed out
                done = true;
                document.getElementById('pastSubmissionsWrapper').style.visibility = "hidden";
                history.push('/login');
                window.location.reload();
                console.error(401);
                return;
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
                const childData = childSnapshot.val();
                userSubs.push(childData);
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

        switch (category) {
            case "applications":
                return (
                    <div class="vstack col-xl-12 col-lg-5 col-md-5 col-sm-6 applications-stack">
                        {submissions.map((app, index) => (
                            <Link onClick={() => handleSubAppForm(app._GrantName)}  class="btn btn-success m-2 applications" key={index}>
                                <div key={index}>{app._GrantName}</div>
                            </Link>
                        ))}

                    </div>
                );

            case "status":
                return (
                    <div class="vstack col-xl-12 col-lg-4 col-md-4 col-sm-3 status-stack">
                        {submissions.map((stat, index) => (
                            <div class="btn btn m-2 order-2 disabled app-status" key={index}>{stat._GrantStatus}</div>
                        ))}
                    </div>
                );

            case "submitted":
                return (
                    <div class="vstack col-xl-12 col-lg-3 col-md-3 col-sm-3 date-submitted-stack">
                        {submissions.map((date, index) => (
                            <div class="p-1 m-2 disabled date-submitted" key={index}>{date._DateSubmitted}</div>
                        ))}
                    </div>
                );

            case "mobileApplications":
                return (
                    <div class="container-fluid card-body row main-card mx-auto mobile-apps btn-toolbar">
                        {submissions.map((app, index) => (
                            <Link onClick={() => handleSubAppForm(app._GrantName)} class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress" key={index}>
                                <div key={index}>{app._GrantName}</div>
                            </Link>
                        ))}
                    </div>
                );

                case "mobileStatus":
                return (
                    <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">
                        {submissions.map((app, index) => (
                            <Link onClick={() => handleSubAppForm(app._GrantStatus)} class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress" key={index}>
                                <div key={index}>{app._GrantStatus}</div>
                            </Link>
                        ))}
                    </div>
                );
            default:
                break;
        }

    }

    GetUserId();
    console.log(localStorage);
    return (
        <div class="flex-wrap page-content" id="pastSubmissionsWrapper" onLoad="javascript:onAuthStateChanged(auth, auth.currentUser)">
            <div class="col">
                <Link class="btn btn-nav btn-sm btn-success back-to-grants" onClick={handleGrantClick}>Back</Link>
            </div>

            <div class="mx-auto text-center page-title">
                <h1 class="past-submissions-title">Past Submissions</h1>
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
                        <div class="row justify-content-center">
                            <h4>Applications</h4>
                            <hr className="mobile-applications-hr" />
                            {PopulateSubmissions("mobileApplications")}
                            <hr className="mobile-applications-hr" />

                            <a href="#link" class="btn btn-success m-6 applications" role="button">Bird Watching Grant 2</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 4/17/23</div>
                            <hr className="mobile-applications-hr" />

                            <a href="#link" class="btn btn-success m-6 applications" role="button">Test</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 9/31/23</div>
                            <hr className="mobile-applications-hr" />

                            <a href="#link" class="btn btn-success m-6 applications" role="button">Environmental Education and Conservation Youth Scholarship and Birding Summer Camp</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 6/7/23</div>
                            <hr className="mobile-applications-hr" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
