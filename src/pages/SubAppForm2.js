import { React, useEffect, useState } from 'react'
import '../css/SubAppForm2.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, child, get, onValue, push, update } from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import { Link } from 'react-router-dom';

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

export function SubAppForm2() {
    const history = useHistory();

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
                document.getElementById('appForm2Wrapper').style.visibility = "hidden";
                history.push('/login'); 
                window.location.reload();
                console.error(401);
                return;
            }
        });
    }, [auth, history]); 
    
    const [userID, setUserID] = useState(null); 

    // desired field is passed in, linked to appropriate box on submission
    function handleInfoDisplay(field, id) {
        app.auth().onAuthStateChanged((user) => {
            if(user) {
                const uid = user.uid;
                const dbRef = ref(database);
                // get data from database as a JSON object, and get each field
                get(child(dbRef, 'users/' + uid + '/forms/EnvironmentalEducation_CitizenScience')).then((snapshot) => {
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
    function handleSelectionDisplay(field, id){
        app.auth().onAuthStateChanged((user) => {
            if(user) {
                const uid = user.uid;
                const dbRef = ref(database);
                // get data from database as a JSON object, and get each field
                get(child(dbRef, 'users/' + uid + '/forms/EnvironmentalEducation_CitizenScience')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        document.getElementById(id).innerHTML = data[field];
                    } else {
                        console.log("NO DATA");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    }
  
    return (
        <div className = "wrapper-appform2" id="appForm2Wrapper">
        <div className = "form-appform2">
            <div className = "grantTitle-appform">
                <label for = "title-appform" class = "title-appform">Environmental Education and Citizen Science Grant</label>
            </div>
            <div className = "questionSection-appform">
                <div className = "infoSection-appform2">
                    <label for = "infoSection-appform2" class = "infoSectionQ-appform2">Please enter the requested information in the boxes below.</label>
                    <div className = "row g-2 row-appform2">
                        <div class = "col-md">
                            <label for = "email">First Name</label>
                            <input type = "text" value = "First Name" class = "form-control" id = "fname-appform2" placeholder = "First Name" aria-label = "First Name" onLoad={handleInfoDisplay('firstName','fname-appform2')} readOnly></input>
                        </div>
                        <div class = "col-md">
                            <label for = "homephone">Last Name</label>
                            <input type = "text" value = "Last Name"class = "form-control" id = "lname-appform2" placeholder = "Last Name" aria-label = "Last Name" onLoad={handleInfoDisplay('lastName','lname-appform2')} readOnly></input>
                        </div>
                    </div>
                </div>
                <div className = "row g-2 row-appform2">
                    <div class = "col-md">
                        <label for = "email-appform2">Email</label>
                        <input type = "text" value = "Email" class = "form-control" id = "email-appform2" placeholder = "Email" aria-label = "Email" onLoad={handleInfoDisplay('email','email-appform2')} readOnly></input>
                    </div>
                    <div class = "col-md">
                        <label for = "phone-appform2">Phone</label>
                        <input type = "text" value = "Phone Number" class = "form-control" id = "phone-appform2" placeholder = "Phone Number" aria-label = "Phone Number" onLoad={handleInfoDisplay('phone','phone-appform2')} readOnly></input>
                    </div>
                </div>
                <div className = "organizationName-appform2">
                    <label for = "organizationName-appform2" class = "organizationQ-appform2">What is the name of the organization that will receive the funding?</label>
                    <textarea type = "text" value = "Organization" class = "form-control" id = "organization" placeholder = "Organization" aria-label = "Organization" rows = "1" onLoad={handleInfoDisplay('Organization','organization')} readOnly></textarea>
                </div>
                <div className = "title1-appform2">
                    <label for="title1-appform2" class="title1Q-appform2">Is this organization a Title 1 School?</label>
                    <div className = "Title1Selection-appform2">
                        <select className = "title1select-appform2" id = "title1"  onLoad={handleSelectionDisplay('IsTitle1','YOrNSelect')}disabled>
                            <option value = "Select" id="YOrNSelect"  > Select</option>
                            <option value = "Yes">Yes</option>
                            <option value = "No">No</option>
                        </select>
                    </div>
                </div>
                <div className = "funding-appform2">
                    <label for = "funding-appform2" class = "fundingQ-appform2">What is the amount of funding requested?</label>
                    <textarea type = "text" value = "Funding Amount" class = "form-control" id = "fundingQuestion-appform2" placeholder = "Cannot exceed $1,500" aria-label = "Amount Requested" rows = "1"  onLoad={handleInfoDisplay('FundingAmount','fundingQuestion-appform2')} readOnly></textarea>
                </div>
                <div className = "envEduc-appform2">
                    <label for = "envEduc-appform2" class = "envEducQ-appform2">What environmental education is addressed by this project?</label>
                    <textarea type = "text" value = "Environmental Education" class = "form-control" id = "envEducQuestion-appform2" placeholder = "..." aria-label = "Environmental Education Addressed" rows = "1" onLoad={handleInfoDisplay('EnvironmentalEducationAddressed','envEducQuestion-appform2')}  readOnly></textarea>
                </div>
                <div className = "benefit-appform2">
                    <label for = "benefit-appform2" class = "benefitQ-appform2">Who will benefit? (Include information such as grade level(s) or ages, demographics, and number of participants.)</label>
                    <textarea type = "text" value = "Benefit" class = "form-control" id = "benefitQuestion-appform2" 
                    placeholder = "Please include information such as grade level(s) or ages, demographics, and number of participants." aria-label = "Who will benefit?" rows = "1" onLoad={handleInfoDisplay('WhoBenefits','benefitQuestion-appform2')}  readOnly></textarea>
                </div>
                <div className = "objectives-appform2">
                    <label for = "objectives-appform2" class = "objectivesQ-appform2">What are the objectives?</label>
                    <textarea type = "text"  value = "Objectives" class = "form-control" id = "objectivesQuestion-appform2" placeholder = "..." aria-label = "Objectives of the Project" rows = "1"  onLoad={handleInfoDisplay('Objectives','objectivesQuestion-appform2')} readOnly></textarea>
                </div>
                <div className = "projectGoals-appform2">
                    <label for = "projectGoals-appform2" class = "projectGoalsQ-appform2">How exactly will the project and/or materials contribute to San Joaquin Audubon’s goals of birding, 
                    conservation, restoration, and environmental literacy?</label>
                    <textarea type = "text"  value = "Project Goals"class = "form-control" id = "projectGoalsQuestion-appform2" placeholder = "..." aria-label = "How will the project contribute?" rows = "1" onLoad={handleInfoDisplay('ProjectGoals','projectGoalsQuestion-appform2')} readOnly ></textarea>
                </div>
                <div className = "fundsExplanation-appform2">
                    <label for = "fundsExplanation-appform2" class = "fundsExplanationQ-appform2">Please include a brief explanation of how the funds will be used.</label>
                    <textarea type = "text" value = "Funds Explanation" class = "form-control" id = "fundsExplanationQuestion-appform2" 
                    placeholder = "Examples: bus expenses to go on an environmental field trip; binoculars for science camps; materials for building bird boxes and field trip fund to set up the boxes." 
                    aria-label = "Funding Explanation" rows = "1" onLoad={handleInfoDisplay('FundsExplanation','fundsExplanationQuestion-appform2')}  readOnly ></textarea>
                </div>
                <div className = "startEndDates-appform2">
                    <label for = "startEndDates-appform2" class = "startEndDatesQ-appform2">List the start and end date of your project or state "Ongoing" for projects that continue.</label>
                    <textarea type = "text" value = "Start and End Dates" class = "form-control" id = "startEndDatesQuestion-appform2" placeholder = "Enter dates as: MM/DD/YYYY - MM/DD/YYYY" aria-label = "Enter dates as: MM/DD/YYYY - MM/DD/YYYY" rows = "1" onLoad={handleInfoDisplay('StartAndEndDates','startEndDatesQuestion-appform2')}  readOnly ></textarea>
                </div>
                <div className = "feedback-appform2">
                    <label for = "feedback-appform2" class = "feedbackQ-appform2">Do you have any feedback or additional comments to make?</label>
                    <textarea type = "text" value = "Feedback" class = "form-control" id = "feedbackQuestion-appform2" placeholder = "Feedback or Additional Comments" aria-label = "Feedback or Additional Comments" rows = "1" onLoad={handleInfoDisplay('Feedback','feedbackQuestion-appform2')}  readOnly ></textarea>
                </div>
            </div>
            
            <div className = "buttonWrapper2-appform" >
                <div className="text-center-appform2">
                    <Link onClick={handlePastClick}><button className = "button1-subappform">Return to Past Submissions</button></Link>
                </div>
            </div>
        </div>
    </div>

    )
  }
