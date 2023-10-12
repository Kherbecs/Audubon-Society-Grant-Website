import react from 'react'
import React, { useState, useEffect } from 'react';
import '../css/AdminPortal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, get, DataSnapshot } from 'firebase/database'; //
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import emailjs from 'emailjs-com'; // Import the emailjs-com library
import { Link } from 'react-router-dom';

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
const adminAuth = adminApp.auth();


const databaseAdmin = firebase.database(adminApp);
const numHitsRef = databaseAdmin.ref("numHits");

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
const database = firebase.database(app);
const auth = app.auth();


/*
const submissionData = {
  'id': 'Submission 6'
};

databaseAdmin.ref('Submissions/').set(submissionData) //change submission data in db
*/


export function AdminPortal() {
    const history = useHistory();

//done is used so that the function can run onLoad but is only used once
//to check if 
useEffect(() => {
    let done = false;
    const unsubscribe = onAuthStateChanged(adminAuth, (currentUser) => {
      if (currentUser && !done) {
        // Admin user is signed in, do nothing
        done = true;
      } else if (!currentUser && !done) {
        // User is signed out
        done = true;
        const adminPortalWrapper = document.getElementById('adminPortalWrapper');
        if (adminPortalWrapper) {
          adminPortalWrapper.style.visibility = 'hidden';
          history.push('/');
          window.location.reload();
        } else {
          console.error('Element with ID "adminPortalWrapper" not found.');
        }
      }
    });

    return () => {
      // Unsubscribe from onAuthStateChanged when the component unmounts
      unsubscribe();
    };
  }, [history]); 

    const handleSubmissionLink = (submissionId) => {
        history.push(`/adminsubappform/${submissionId}`);
        window.location.reload();
      };

    function handleLogOut() {
        // Checks if it's an admin account and if it is, it redirects them to admin login and signs out
        signOut(adminAuth).then(() => {
            console.log('Logout success');
            history.push('/adminlogin');
            window.location.reload();
        }).catch((error) => {
            console.error('Logout error:', error);
        });
    }

    //DYNAMIC SUBMISSIONS AND LOCK STATES
    const [submissions, setSubmissions] = useState([
        { id: 1, name: "Submission 1" }, //dummy submissions
        { id: 2, name: "Submission 2" },
        { id: 3, name: "Submission 3" },
        { id: 4, name: "Tester " },
        { id: 5, name: "Alex Jackson " },
        { id: 6, name: "Submission 6" },
    ]); // List of submissions


    const [buttonStates, setButtonStates] = useState([]); // List of button (lock) states

    const handleCheckbox = (index) => {
        const lockID = `lock_${submissions[index].id}`;

        database.ref(`locks/${lockID}`).set({
            state: !buttonStates[index]
        });

        setButtonStates((prevStates) => {
            const newStates = [...prevStates];
            newStates[index] = !newStates[index];
            return newStates;
        });
    };

    useEffect(() => {
        const getStates = async () => {
            const newButtonStates = await Promise.all(
                submissions.map(async (submission) => {
                    const lockID = `lock_${submission.id}`;
                    const dbStates = await database.ref(`locks/${lockID}`).get();
                    const curStates = dbStates.val();
                    return curStates ? curStates.state : false;
                })
            );
            setButtonStates(newButtonStates);
        };
        getStates();
    }, []);


    /*-----------UNIQUE VISITOR COUNTER STATES-----------------*/


    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const docRef = numHitsRef;
                const docSnapshot = await docRef.get();
                if (docSnapshot.exists) {
                    const data = docSnapshot.val();
                    setData(data);
                    setLoading(false);
                } else {
                    console.log("No such document dude");
                }
            } catch (error) {
                console.error('Error fetching document: ', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    console.log(data);
    /*----------------UNIQUE VISITOR CODE END----------------------*/

    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    //NOT YET WORKING; CODE FOR HANDLING SEARCHBAR INPUTS

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const fetchAllUsers = async () => {
            try {
                const snapshot = await database.ref('users').once('value');
                const results = [];
                snapshot.forEach((childSnapshot) => {
                    const user = childSnapshot.val();
                    results.push(user);
                });
                setSearchResults(results);
            } catch (error) {
                console.error('Error fetching all users:', error);
            }
        };

        fetchAllUsers();
    }, []);

    const handleSearch = async (event) => {
        const input = event.target.value.toLowerCase().trim();
        const results = [];



        try {
            const snapshot = await database.ref('users').once('value');
            snapshot.forEach((childSnapshot) => {
                const user = childSnapshot.val();
                console.log(user);
                // Check if the user's name or grant type contains the input
                if (user) {
                    const { fullName, grantType, email } = user;
                    if (fullName && email) {
                        if (fullName.toLowerCase().includes(input) || email.toLowerCase().includes(input)) {
                            results.push(user);
                        }
                        if (grantType && grantType.toLowerCase().includes(input)) {
                            results.push(user);
                        }
                    }

                }
            });
        } catch (error) {
            console.error('Error searching users:', error);
        }

        setSearchResults(results);
    };

    //REMOVE ${submission.id} FROM SUB BOX TO GET LINK TO SUBAPPFORM WORKING; id is for when there are real submissions to pull forms from


    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch all users from Firebase
        const usersRef = ref(database, 'users');
        get(usersRef)
            .then((snapshot) => {
                const usersArray = [];
                snapshot.forEach((childSnapshot) => {
                    const user = childSnapshot.val();
                    usersArray.push(user);
                });
                setUsers(usersArray);
            })
            .catch((error) => {
                console.error('Error fetching users: ', error);
            });
    }, []);

    // Function to send the email to users who signed up for grant updates
    const sendMail = () => {
        // Initialize Email.js 
        emailjs.init("ExVfhWJSKY2SPFYqo");

        // Extract input values
        const sendername = document.querySelector("#sendername").value;
        const subject = document.querySelector("#subject").value;
        const message = document.querySelector("#message").value;

        const serviceID = "service_3gpojoc"; // Email Service ID
        const templateID = "template_7asx4tu"; // Email Template ID

        if (!sendername || !subject || !message) {
            // Check if any of the fields are empty
            alert("Please fill in all fields.");
            return;
        }

        // Iterate through users and send emails if signUpForGrants is true
        users.forEach((user) => {
            if (user.signUpForGrants === true) {
                const params = {
                    sendername,
                    to: user.email, // Set "to" to the user's email
                    subject,
                    replyto: user.email, // Set "replyto" to the user's email
                    message,
                };

                // Send the email
                emailjs.send(serviceID, templateID, params).then((response) => {
                    //alert("Email sent successfully!");
                    window.location.reload();
                })
                    .catch((error) => {
                        console.error("Email sending error", error);
                    });
            }
        });
    };

    return (

        <div class="wrapper-admin-portal" id="adminPortalWrapper" onLoad="javascript:onAuthStateChanged(adminAuth, adminAuth.currentUser)">

            <button class="logout" onClick={handleLogOut}><a class="logoutlink">Logout</a></button>
            <div class="divider" />
            <button type="button" class="email" data-bs-toggle="modal" data-bs-target="#exampleModal">Send a Grant Update</button>

            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Email Those Who Signed Up for Grant Updates</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="sender-name" class="col-form-label">Sender Name:</label>
                                    <input type="text" class="form-control" id="sendername"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="subject-name" class="col-form-label">Subject:</label>
                                    <input type="text" class="form-control" id="subject"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Message:</label>
                                    <textarea class="form-control" id="message"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" onClick={sendMail}>Send message</button>
                        </div>
                    </div>
                </div>
            </div>

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
                            <input type="name" class="form-control" id="searchBar" placeholder="Search for applicants" onChange={handleSearch}></input>
                            <button class="search">Search</button>
                        </div>
                    </div>
                </div>

                <div class="search-results">
                    <div class="search-results-box">
                        {searchResults.map((user) => (
                            <div key={user.id}>
                                <p style={{ fontWeight: 'bold' }}>Full Name: {user.fullName}</p>
                                <p>Email: {user.email}</p>
                                <p>Signed up for Grant: {user.signUpForGrants !== undefined ? user.signUpForGrants.toString() : 'N/A'}</p>
                                <p>Grant Type: {user.grantType ? user.grantType : 'N/A'}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="submissions-box">
                {submissions.map((submission, index) => (
                    <div key={index}>
                        <button className="sub" disabled={buttonStates[index]}>
                            {buttonStates[index] ? (
                                <span className="submission-link">Submission</span>
                            ) : (
                                <Link className="submission-link" onClick={handleSubmissionLink}>{submission.name}</Link>
                            )}
                        </button>
                        <label className="switch">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckbox(index)}
                                checked={buttonStates[index]}
                            />
                            <span className="slider round"></span>
                        </label>
                    </div>
                ))}
            </div>

            <div class="hit-counter">
                {loading ? (<h5>Loading Unique Visitors...</h5>) : (<h5>Unique Visitors: {data}</h5>)}
            </div>


        </div>
    )
}