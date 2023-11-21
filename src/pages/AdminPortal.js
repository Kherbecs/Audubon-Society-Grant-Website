import React, { useState, useEffect} from 'react';
import '../css/AdminPortal.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { get, ref} from 'firebase/database';
import { signOut, onAuthStateChanged } from "firebase/auth";
import emailjs from 'emailjs-com'; // Import the emailjs-com library
import { AdminSubAppForm } from './AdminSubAppForm'; // Import the component
import { AdminSubAppForm2 } from './AdminSubAppForm2';






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


export function AdminPortal() {
    const history = useHistory();


    useEffect(() => {
        let done = false;
        onAuthStateChanged(adminAuth, (user) => {
          if (user && !done) {
            // Check if the user's email is verified
            if (user.emailVerified) {
              // Email is verified, user can access this part of the app
              done = true;
            } else {
              history.push('/adminlogin');
              window.location.reload();
            }
          } else if (!user && !done) {
            // User is not authenticated, redirect to login
            history.push('/adminlogin');
            window.location.reload();
          }
        });
      }, [adminAuth, history]);


    /* HANDLE LOGOUT AUTHENTICATION */
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


    /* RETRIEVING USER IDS AND DATA FROM DB */
    const [uids, setUids] = useState([]);
    const [userData, setUserData] = useState([]);


    useEffect(() => {
        const fetchUids = async () => {
            try {
                const snapshot = await database.ref('users').once('value');
                const uidData = snapshot.val();
                setUserData(uidData);
                const id = Object.keys(uidData);
                setUids(id);
           
            } catch(error) {
                console.error('Could not fetch uids:', error);
            }
        }
        fetchUids();
    }, []) //empty braces so code runs once
   
    /* SCROLLING AND STORING SELECTED UID */
    useEffect(() => {
        if(displayApp && buttonClicked) {
            const formName = userData[selectedUid]?.forms?.steve_stocking ? 'steve_stocking' : 'EnvironmentalEducation_CitizenScience';
            const targetId = formName === 'steve_stocking' ? 'adminSubAppFormWrapper' : 'adminsubappform2Wrapper';
            document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
                setButtonClicked(false);
        }
    });
   
    const [buttonClicked, setButtonClicked] = useState(false);


    const [selectedUid, setSelectedUid] = useState(null);


    const handleButton = (uid) => {
        setSelectedUid(uid);
        setDisplayApp(true);
        setButtonClicked(true);
    }
   
    const [displayApp, setDisplayApp] = useState(false);
   
    /* LOCK FUNCTIONALITY */
    const [lockStates, setLockStates] = useState({}); // List of lock states
    //updating database when lock state changes
    const handleCheckbox = async (uid) => {
        try {
   
            setLockStates((prevStates) => ({
                ...prevStates,
                [uid]: !prevStates[uid]
            }));
   
            database.ref(`users/${uid}/forms`).update({
                _LockStatus: !lockStates[uid]
            });
   
            setButtonClicked(false);
        } catch (error) {
            console.error('Error handling checkbox', error);
        }
    };
    //updating locks visually when page is opened or refreshed
    useEffect(() => {
        const getStates = async () => {
            try{
                const newButtonStates = await Promise.all(
                    uids.map(async (uid) => {
                        if(uid){
                            const dbStates = await database.ref(`users/${uid}/forms`).get();
                            const curStates = dbStates.val();
                            console.log(`Lock state for ${uid}:`, curStates ? curStates._LockStatus : 'Not found');
                            return {uid, lockStatus: curStates ? curStates._LockStatus : false};
                        }
                    })
                );


                const updatedLockStates = newButtonStates.reduce((acc, {uid, lockStatus}) => {
                    if(uid){
                        acc[uid] = lockStatus;
                    }
                    return acc;
                }, {});
                console.log("new lock states: " + updatedLockStates);
                setLockStates(updatedLockStates);
            }catch(error){
                console.error('Error fetching lock states',error);
            }
        };
        getStates();
    }, [uids]);


    /*-----------UNIQUE VISITOR COUNTER STATES-----------------*/
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
        const fetchData = async () => {
            try{
                const docRef = numHitsRef;
                const docSnapshot = await docRef.get();
                if(docSnapshot.exists){
                    const data = docSnapshot.val();
                    setData(data);
                    setLoading(false);
                }else{
                    console.log("No such document");
                }  
            }catch (error){
                console.error('Error fetching document: ', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);


    console.log(data);
    /*----------------UNIQUE VISITOR CODE END----------------------*/


  //stores search results from db in variable
  const [searchResults, setSearchResults] = useState([]);


  //function to retrieve users info for display in the information box when the page is opened or refreshed
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
  //variable for user ids that match input in the search bar
  const [filteredUids, setFilteredUids] = useState([]);


  /* SEARCH FUNCTION */
  const handleSearch = async (event) => {
    const input = event.target.value.toLowerCase().trim();
    const results = [];


    try {
        const snapshot = await database.ref('users').once('value');
        const filteredUids = [];
        snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            // Check if the user's name or email matches the search input
            if(user) {
                const {fullName, email} = user;
                if(fullName && email) {
                    if(fullName.toLowerCase().includes(input) || email.toLowerCase().includes(input)){
                        results.push(user);
                        filteredUids.push(childSnapshot.key);
                    }
                }
            }
        });
   
    setSearchResults(results);
    setFilteredUids(filteredUids);


    } catch (error) {
        console.error('Error searching users:', error);
    }
  };


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
                    window.location.reload();
                })
                    .catch((error) => {
                        console.error("Email sending error", error);
                    });
            }
        });
    };


       // Function for an admin to send an email to a user
       const sendMailEmail = () => {
        // Initialize Email.js
        emailjs.init("ExVfhWJSKY2SPFYqo");


        // Extract input values
        const sendername2 = document.querySelector("#sendername2").value;
        const to = document.querySelector("#to").value;
        const subject2 = document.querySelector("#subject2").value;
        const replyto = document.querySelector("#replyto").value;
        const message2 = document.querySelector("#message2").value;


        // Email.js parameters
        const params = {
            sendername2,
            to,
            subject2,
            replyto,
            message2,
        };


        const serviceID = "service_r5sydhn"; // Email Service ID
        const templateID = "template_dp0perq"; // Email Template ID


        if (!sendername2 || !to || !subject2 || !replyto || !message2) {
            // Check if any of the fields are empty
            alert("Please fill in all fields.");
            return;
        }


        const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Check if "to" and "replyto" emails are in the proper format
        if (!emailFormat.test(to) || !emailFormat.test(replyto)) {
            alert("Please enter valid email addresses.");
            return;
        }


        // Send the email
        emailjs.send(serviceID, templateID, params).then((response) => {
            window.location.reload();
        })
            .catch((error) => {
                console.error("Email sending error", error);
            });
    };
    //changing submission names from the database variables to user friendly/accurate grant and scholarship names
    function getForms(uid){
        var str = "";
        Object.keys(userData[uid]?.forms).forEach(key => {
            if(key == "EnvironmentalEducation_CitizenScience"){
                str += "Environmental Education and Citizen Science Grant | ";
            }else if(key == "steve_stocking"){
                str += "Steve Stocking Youth Environmental Scholarship";
            }
        })
        return str;
    }
    //function to create admin account and write info to the database with error bounds on the input
    async function handleAdminRegistration() {
        const fullName = document.getElementById('full-name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
       
        if(password.trim() === '' && fullName.trim() === '' && confirmPassword.trim() === '' && email.trim() === '') {
          document.getElementById('alert-message').textContent = 'Please fill out all fields';
          return;
        }
     
        const fullNameRegex = /^[A-Za-z\s]+$/;
     
        // Full name can only be using spaces and letters
        if (!fullNameRegex.test(fullName)) {
          document.getElementById('alert-message').textContent = 'Please enter a valid full name';
          return;
        }
     
        if (fullName.trim() === '') {
          document.getElementById('alert-message').textContent = 'Please enter your full name';
          return;
        }
     
        if(email.trim() === '') {
          document.getElementById('alert-message').textContent = 'Please enter your email';
          return;
        }
     
        if(password.trim() === '') {
          document.getElementById('alert-message').textContent = 'Please enter your password';
          return;
        }
     
        //Checks if email is valid
        const emailRegex = /\S+@\S+\.\S+/;
        if (!emailRegex.test(email)) {
          document.getElementById('alert-message').textContent = 'Please enter a valid email address';
          return;
        }
     
        // Checks if password matches
        if (password !== confirmPassword) {
          document.getElementById('alert-message').textContent = 'Passwords do not match';
          return;
        }
     
        // Checks the password requirement
        if((password.length < 6 || /\s/.test(password)) && !(password.trim() === '')) {
          document.getElementById('alert-message').textContent = 'Password must be at least 6 characters long and not contain spaces';
          return;
        }
     
        // Checks if the email is used
        try {
          const signInMethods = await adminApp.auth().fetchSignInMethodsForEmail(email);
          if (signInMethods.length > 0) {
            document.getElementById('alert-message').textContent = 'This email address is already registered';
            return;
          }
        } catch (error) {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
        }
       
        // firebase creates the acc with the email and password
        adminAuth.createUserWithEmailAndPassword(email, password)
          .then(async (userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log(user);
            alert('Account successfully created! Please check your email for verification.');
            try {
              await adminAuth.currentUser.sendEmailVerification();
              // Email verification sent
              console.log('Email verification sent');
     
              // Write registration data to the Realtime Database
              const databaseAdmin = firebase.database(adminApp);
              const userId = user.uid;
              const userData = {
                fullName: fullName,
                email: email
              };
              databaseAdmin.ref('users/' + userId).set(userData)
                .then(() => {
                console.log('Data successfully written to the database');
                window.location.reload();
              })
              .catch((error) => {
                console.error('Error writing data to the database: ', error);
              });
            } catch (error) {
              const errorCode = error.code;
              const errorMessage = error.message;
              console.log(errorMessage);
            }
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
          });
      }


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
                            <button type="button" class="btn btn-success" onClick={sendMail}>Send update</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="divider" />
            <button type="button" class="email" data-bs-toggle="modal" data-bs-target="#exampleModal2">Email</button>


            <div class="modal fade" id="exampleModal2" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Email</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="sender-name" class="col-form-label">Sender Name:</label>
                                    <input type="text" class="form-control" id="sendername2"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="subject-name" class="col-form-label">To:</label>
                                    <input type="text" class="form-control" id="to"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="subject-name" class="col-form-label">Subject:</label>
                                    <input type="text" class="form-control" id="subject2"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="subject-name" class="col-form-label">Reply To:</label>
                                    <input type="text" class="form-control" id="replyto"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="message-text" class="col-form-label">Message:</label>
                                    <textarea class="form-control" id="message2"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" onClick={sendMailEmail}>Send message</button>
                        </div>
                    </div>
                </div>
            </div>


            <div class="divider" />
            <button type="button" class="email" data-bs-toggle="modal" data-bs-target="#exampleModal3">Register an Admin Account</button>
           
            <div class="modal fade" id="exampleModal3" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Register an Admin Account</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div class="mb-3">
                                    <label for="full-name" class="col-form-label">Full Name:</label>
                                    <input type="text" class="form-control" id="full-name"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="col-form-label">Email Address:</label>
                                    <input type="text" class="form-control" id="email"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="col-form-label">Password:</label>
                                    <input type="password" className="form-control form-control-lg" id="password"></input>
                                </div>
                                <div class="mb-3">
                                    <label for="repeat-password" class="col-form-label">Repeat Password:</label>
                                    <input type="password" className="form-control form-control-lg" id="confirm-password"></input>
                                </div>
                                <div className="error-message-ar" id="alert-message">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-success" onClick={handleAdminRegistration}>Create Account</button>
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
                        <div key={user.id} class="user-info">
                           
                            <div class="user-info-item">
                    <p style={{fontWeight: 'bold'}}>Full Name: {user.fullName}</p>
                </div>
                <div class="user-info-item">
                    <p>Email: {user.email}</p>
                </div>
                <div class="user-info-item">
                    <p>Signed up for Grant Updates: {user.signUpForGrants !== undefined ? user.signUpForGrants.toString() : 'N/A'}</p>
                </div>
                           
                        </div>
                    ))}
                </div>
            </div>
       
            <div className="submissions-box">


                {(filteredUids.length > 0 ? filteredUids : uids).map((uid) => (
                   userData[uid]?.forms?.steve_stocking || userData[uid]?.forms?.EnvironmentalEducation_CitizenScience ? (
                    <div key={uid}>
                       
                            <button className="sub" onClick={() =>{
                                handleButton(uid);
                            }}>
                                <span className="submission-link">{userData[uid]?.fullName !== undefined ? userData[uid]?.fullName : 'No Name'}</span>


                                {userData[uid]?.forms && (
                                    <div className="submitted-forms">
                                        Forms: {getForms(uid)}
                                    </div>
                                )}


                            </button>
                            <label className="switch">
                            <input
                                type="checkbox"
                                onChange={() => handleCheckbox(uid)}
                                checked={lockStates[uid] || false}
                            />
                            <span className="slider round"></span>
                        </label>




                    </div>
                ) : null
                ))}
            </div>
           
        {/* console.log("Selected uid = " + selectedUid) */}
        {/* display submitted application forms */}
        {displayApp && userData[selectedUid]?.forms?.steve_stocking && <AdminSubAppForm uid={selectedUid}/>}
        {displayApp && userData[selectedUid]?.forms?.EnvironmentalEducation_CitizenScience && <AdminSubAppForm2 uid={selectedUid}/>} {/* May need form2 versions of variables, not sure yet */}


        <div class="hit-counter">
            {loading ? (<h5>Loading Unique Visitors...</h5>) : (<h5>Unique Visitors: {data}</h5>)}
        </div>
    </div>
    )
 
}
