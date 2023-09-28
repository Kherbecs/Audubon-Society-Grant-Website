import React from 'react'
import '../css/SubAppForm.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, child, get, onValue, push, update } from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

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
const analytics = getAnalytics(app);
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
    //hide the webpage if no viable admin user
    done = true;
    document.getElementById('subAppFormWrapper').style.visibility = "hidden";
    window.location.href = '/login';
    console.error(401);
    return;
  }
  return;
});

export function SubAppForm() {
    // desired field is passed in, linked to appropriate box on submission
    function handleInfoDisplay(field, id) {
        app.auth().onAuthStateChanged((user) => {
            if(user) {
                const uid = user.uid;
                const dbRef = ref(database);
                // get data from database as a JSON object, and get each field
                get(child(dbRef, 'users/' + uid + '/forms/steve_stocking')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        document.getElementById(id).value = data[field];
                    } else {
                        console.log("NO DATA");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    }

    function handleURLDisplay(field, id) {
        app.auth().onAuthStateChanged((user) => {
            if(user) {
                const uid = user.uid;
                const dbRef = ref(database);
                // get data from database as a JSON object, and get each field
                get(child(dbRef, 'users/' + uid + '/forms/steve_stocking')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        document.getElementById(id).href = data[field];
                    } else {
                        alert("Document not found");
                        console.log("NO DATA");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    }


    return (
        <div className = "wrapper-subappform" id="subAppFormWrapper" onLoad="javascript:onAuthStateChanged(auth, auth.currentUser)">
            <div className = "form-subappform">
                <div className = "grantTitle-subappform">
                    <label for = "title-subappform" className = "title-subappform">Steve Stocking Youth Environmental Scholarship</label>
                </div>
                <div className = "questionSection-subappform">
                    <div className = "basicInfo-subappform">
                        <label for="basicInfoText" className ="form-label-subappform1">In the text boxes below, please type your name, address, home phone, email, birth date (mm/dd/yy), and your city, state, and ZIP code.</label>
                        <div className = "basicInfoWrapper-subappform">
                            <div className = "row g-3 row-appform">
                                <div className = "col-md">
                                    <label for = "fname">First Name</label>
                                    <input type = "text" id = 'fname' value = '' onLoad = {handleInfoDisplay('firstName', 'fname')} className = "form-control user-info-field" placeholder = "First Name" aria-label= "First Name" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "lname">Last Name</label>
                                    <input type = "text" id = 'lname' value = '' onLoad = {handleInfoDisplay('lastName', 'lname')} className = "form-control user-info-field" placeholder = "Last Name" aria-label= "Last Name" readOnly></input>
                                </div>
                            </div>
                            <div className = "row g-3 row-appform">
                                <div className = "col-md">
                                    <label for = "birthday">Birth Date (mm/dd/yy)</label>
                                    <input type = "text" id = 'birthday' value = '' onLoad = {handleInfoDisplay('birthday', 'birthday')} className = "form-control user-info-field" placeholder = "Birth Date (mm/dd/yy)" aria-label = "Birth Date (mm/dd/yy)" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "email">Email</label>
                                    <input type = "text" id = 'email' value = '' onLoad = {handleInfoDisplay('email', 'email')} className = "form-control user-info-field" placeholder = "Email" aria-label = "Email" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "homephone">Home Phone</label>
                                    <input type = "text" id = 'phone' value = '' onLoad = {handleInfoDisplay('phone', 'phone')} className = "form-control user-info-field" placeholder = "Home Phone" aria-label = "Home Phone" readOnly></input>
                                </div>
                            </div>
                            <div className = "row g-3 row-appform">
                                <div className = "col-md">
                                    <label for = "address">Address</label>
                                    <input type = "text" id = 'address' value = '' onLoad = {handleInfoDisplay('address', 'address')} className = "form-control user-info-field" placeholder = "Address" aria-label = "Address" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "city">City</label>
                                    <input type = "text" id = 'city' value = '' onLoad = {handleInfoDisplay('city', 'city')} className = "form-control user-info-field" placeholder = "City" aria-label = "City" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "state">State</label>
                                    <input type = "text" id = 'state' value = '' onLoad = {handleInfoDisplay('state', 'state')} className = "form-control user-info-field" placeholder = "State" aria-label = "State" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "zip">ZIP Code</label>
                                    <input type = "text" id = 'zip' value = '' onLoad = {handleInfoDisplay('zip', 'zip')} className = "form-control user-info-field" placeholder = "ZIP Code" aria-label = "ZIP Code" readOnly></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "q1-subappform">
                        <label for="question1Text" className="form-label-subappform2">Are you, or a parent or guardian, a member of the San Joaquin Audubon Society?</label>
                        <div className = "Q1Selection-subappform">
                            <input type = 'text' className = "q1select-subappform" id = 'q1' onLoad = {handleInfoDisplay('question1', 'q1')} size = '2' readOnly></input>
                        </div>
                    </div>
                    <div className = "q2-subappform">
                        <label for="question2Text" className="form-label-subappform2">Do you live in San Joaquin County?</label>
                        <div className = "Q1Selection-subappform">
                            <input type = 'text'  className = "q2select-subappform" id = 'q2' onLoad = {handleInfoDisplay('question2', 'q2')} size = '2' readOnly></input>
                        </div>                        
                    </div>
                    <div className = "q3-subappform">
                        <label for="question3Text" className="form-label-subappform2">Which camp or program do you want to attend?</label>
                        <div class="wrapper-user-answer">
                            <textarea class="form-control" id = 'q3' rows="4" value = '' onLoad = {handleInfoDisplay('question3', 'q3')} readOnly>
                            </textarea>
                        </div>                         
                    </div>
                    <div className = "q4-subappform">
                        <label for="question4Text" className="form-label-subappform2">Do you have any feedback for us?</label>
                        <div className="wrapper-user-answer">
                        <textarea className="form-control" id = 'q4' rows="4" value = '' onLoad = {handleInfoDisplay('question4', 'q4')} readOnly>
                        </textarea>       
                        </div> 
                    </div>
                    <div className = "q5-subappform">
                        <label for="question5Text" className="form-label-appform5">Please submit a letter of recommendation from a teacher, parent, or adult friend that should cover what they know about your interest in learning about the environment, nature, or birds.</label>
                    </div>
                    <div className = "uploadButtonLetterOfRec-subappform">
                        
                            <a className = "letterLink" id = "letterLinkID" href='#' target = "blank" onLoad = {handleURLDisplay('urlLinkLetter', 'letterLinkID')}>
                                letter_of_recommendation.pdf
                            </a>
                    
                    </div>
                    <div className = "q6-subappform">
                        <label for="question6Text" className="form-label-appform6">Please also submit a personal essay that states the importance of attending an environmental, nature, or birding camp or program to you. The essay should not be more than 2 pages long. Do you try to teach others about nature or birds? Do you draw trees, plants, birds, or other animals in nature you see? We want to know about your interest in the environment and nature.</label>
                    </div>
                    <div className = "uploadButtonEssay-subappform">
                        <a className = "essayLink" id = "essayLinkID" href='#' target = "blank" onLoad = {handleURLDisplay('urlLinkEssay', 'essayLinkID')}>
                            personal_essay.pdf</a>
                    </div>
                </div>
                <div className = "buttonWrapper1-subappform" >
                    <div className="text-center-subappform">
                        <a href = "/pastsubmissions"><button className = "button1-subappform">Return to Past Submissions</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}