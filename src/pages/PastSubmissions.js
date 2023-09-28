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
    document.getElementById('pastSubmissionsWrapper').style.visibility = "hidden";
    window.location.href = '/login';
    console.error(401);
    return;
  }
  return;
});


export function PastSubmissions() {
    
    const [userID, setUserID] = useState(null); 

    useEffect(() => {
        const nodeRef = ref(database, "users/" + userID + "/pastsubmissions" + "/null");
        let nodeRefArr = [];
        nodeRefArr.push(nodeRef);

        get(nodeRef)
            .then((snapshot) => {
                if(snapshot.exists()) {
                    console.log("Node submissions exists");
                } else {
                    console.log("pastsubmissions doesnt exist");
                    set(nodeRef, {
                        grantName: "null",
                        grantStatus: "null",
                        dateSubmitted: "null"
                    });
                }
            }).catch((error) => {
                console.error("Error checking node: " + error);
            }) 
    }, [userID]);

function addDummySubmissions() {
    let nodeRefArr = [];
    nodeRefArr.push(ref(database, "users/" + userID + "/pastsubmissions" + "/submission 1"));
    nodeRefArr.push(ref(database, "users/" + userID + "/pastsubmissions" + "/submission 2"));

    nodeRefArr.forEach(submissionRef => {
        set(submissionRef, {
            grantName: "2",
            grantStatus: "rejected",
            dateSubmitted: "1/1/24"
        })
    });
}

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

            const nodeRef = ref(database, "users/" + userID + "/pastsubmissions");

            const snapshot = await get(nodeRef);

            snapshot.forEach((childSnapshot) => {
                const childData = childSnapshot.val();
                userSubs.push(childData);
            });

            return userSubs;
         } catch(error) {
            console.error("Error getting data: ", error);
            return [];
         }
    }

    function PopulateDesktop(category) {
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
                } catch(error) {
                    console.error("Error fetching and setting data: ", error);
                }
            };

            fetchAndSetData();
        }, []);

        if(category === "applications") {
            return (
                <div class="vstack col-xl-12 col-lg-5 col-md-5 col-sm-6 applications-stack">
                {submissions.map((app, index)=> (
                    <div class="btn btn-success m-2 applications" key={index}>{app.grantName}</div>
                ))}
                </div>
            );
        } else if(category === "status") {
            return (
                <div class="vstack col-xl-12 col-lg-4 col-md-4 col-sm-3 status-stack">
                {submissions.map((stat, index)=> (
                    <div class="btn btn m-2 order-2 disabled app-status" key={index}>{stat.grantStatus}</div>
                ))}
                </div>
            );
        } else if(category === "submitted") {
            return (
                <div class="vstack col-xl-12 col-lg-3 col-md-3 col-sm-3 date-submitted-stack">
                {submissions.map((sub, index)=> (
                    <div class="p-1 m-2 disabled date-submitted" key={index}>{sub.dateSubmitted}</div>
                ))}
                </div>
            );
        }
    }

    GetUserId();
    addDummySubmissions();
    return (
        <div class="flex-wrap page-content" id="pastSubmissionsWrapper" onLoad="javascript:onAuthStateChanged(auth, auth.currentUser)">
            <div class="col">
                <a class="btn btn-nav btn-sm btn-success back-to-grants" href="/grantselection">Back</a>
            </div>

            <div class="mx-auto text-center page-title">
                <h1 class="past-submissions-title">Past Submissions</h1>
            </div>

            <div class="container-fluid container-content">
                <div class="col-8 card submission-body">
                    <div class="card-body row main-card desktop-apps">
                        <div class="vstack col-xl-6 col-lg-5 col-md-5 col-sm-6 applications-stack">
                            <h4>Applications</h4>
                            <hr className="hr-past-submissions"/>
                            {PopulateDesktop("applications")}
                        </div>

                        <div class="vstack col-xl-4 col-lg-4 col-md-4 col-sm-3  status-stack">
                            <h4 class="mobile-hide">Status</h4>
                            <hr className="hr-past-submissions mobile-hide"/>
                            {PopulateDesktop("status")}
                        </div>
        
                        <div class="vstack col-xl-2 col-lg-3 col-md-3 col-sm-3 date-submitted-stack">
                            <h4 class="mobile-hide">Submitted</h4>
                            <hr className="hr-past-submissions mobile-hide"/>
                            {PopulateDesktop("submitted")}
                        </div>
                    </div>

                    <div class="container-fluid card-body row main-card mx-auto mobile-apps btn-toolbar">
                        <div class="row justify-content-center">
                            <h4>Applications</h4>
                            <hr className="mobile-applications-hr"/>
                            <a href="/subappform" class="btn btn-success m-6 applications col-md-12" role="button">Bird Watching Grant</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 4/17/23</div>
                            <hr className="mobile-applications-hr"/>
                            
                            <a href="#link" class="btn btn-success m-6 applications" role="button">Bird Watching Grant 2</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 4/17/23</div>
                            <hr className="mobile-applications-hr"/>

                            <a href="#link" class="btn btn-success m-6 applications" role="button">Test</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 9/31/23</div>
                            <hr className="mobile-applications-hr"/>

                            <a href="#link" class="btn btn-success m-6 applications" role="button">Environmental Education and Conservation Youth Scholarship and Birding Summer Camp</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 6/7/23</div>
                            <hr className="mobile-applications-hr"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}