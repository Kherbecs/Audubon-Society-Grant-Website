import { React, useEffect, useState } from 'react'
import '../css/AdminSubAppForm2.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, child, get, onValue, push, update } from 'firebase/database';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


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

const firebaseConfig = {
    apiKey: "AIzaSyCzdnLMAkegsr-zrw9O63Nlu6Ft_Urdw50",
    authDomain: "team-pwd.firebaseapp.com",
    projectId: "team-pwd",
    storageBucket: "team-pwd.appspot.com",
    messagingSenderId: "129648865838",
    appId: "1:129648865838:web:9713fb401ac09b481e25bf",
    measurementId: "G-6FM488KSS5"
  };

 // Initialize Firebase for admins
const adminApp = firebase.initializeApp(adminFirebaseConfig, 'admin-app');
console.log(adminApp);
const databaseAdmin = getDatabase(adminApp);
const adminAuth = adminApp.auth();

// User information for comments
var userEmail = null;
onAuthStateChanged(adminAuth, (currentUser)=>{
    if(currentUser){
        console.log(currentUser.email);
        userEmail = currentUser.email;
    }else{
        console.log('no one logged in');
    }
})

// Initialize Firebase for users
const app = firebase.initializeApp(firebaseConfig, 'my-app');
console.log(app);
const database = getDatabase(app);

const chosenApplication = "";

const dataUp = ref(database,'users'+ '/sw6pjwUkORaoJbGSpVt3DVCOf8t2' +'/pastsubmissions'+'/submission 1');
const statusNow = ref(database,'users'+ '/sw6pjwUkORaoJbGSpVt3DVCOf8t2' +'/pastsubmissions'+'/submission 1'+'/grantStatus');
var loadStatus ='';
 
        //get current value from database before change 
        onValue(statusNow, (snapshot) => {
            loadStatus = snapshot.val();
            
            document.getElementById('statusOne').innerHTML = loadStatus;
            document.getElementById('statusDisplay1').innerHTML= loadStatus;
        })


export function AdminSubAppForm2() {
    const history = useHistory();

    const handleAdminClick = () => {
        history.push('/adminportal');
        window.location.reload();
    };

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
        const adminsubappform2 = document.getElementById('adminsubappform2Wrapper');
        if (adminsubappform2) {
            adminsubappform2.style.visibility = 'hidden';
          history.push('/');
          window.location.reload();
        } else {
          console.error('Element with ID "adminsubappformWrapper2" not found.');
        }
      }
    });

    return () => {
      // Unsubscribe from onAuthStateChanged when the component unmounts
      unsubscribe();
    };
  }, [history]); 

    const getInitialState = () =>{
        const value = "Grade";
        return value;
    }

    const [grade, setGrade] = useState(getInitialState);

    const handleChange = (e) => {
        setGrade(e.target.value);
    };

    function handleInfoDisplay(field, id) {
        const dbRef = ref(database);
        // Replace the hardcoded path with the actual path to the user's data in the database
        get(child(dbRef, 'users/' + 'sw6pjwUkORaoJbGSpVt3DVCOf8t2' + '/forms/EnvironmentalEducation_CitizenScience')).then((snapshot) => {
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
    
    //function that runs when you change status
    function statusChange(){
        //update to database
        const newStatus = document.getElementById('floatingSelect1').value;
        update(dataUp,{grantStatus: newStatus});  
    }

    function getComments(){
        const databaseAdmin = firebase.database(adminApp);

        var pastComments = databaseAdmin.ref('users/commentHistory');
        pastComments.on('value', (snapshot) => {
            let commentsHTML = '';
            snapshot.forEach((snapshot) => {
                const commenter = snapshot.val().commenter;
                const comment = snapshot.val().comment;
                if (snapshot.val().grade != null){
                    commentsHTML += commenter + " | Grade : " + snapshot.val().grade + "<br />" + "&emsp;" + comment + "<br />";
                }else{
                    commentsHTML += commenter + " | Grade : NONE" + "<br />" + "&emsp;" + comment + "<br />";
                }
  
            })
            updateCommentSection(commentsHTML);
        })
    }

    function updateCommentSection(commentsHTML) {
        var prevComments = document.getElementById("prev-comments");
        prevComments.innerHTML = commentsHTML;
    }
    getComments();

    function postComment(){
        var newComment = document.getElementById("new-comment").value;
        document.getElementById("addCommmentButton").id = "addCommmentButton";

        const databaseAdmin = firebase.database(adminApp);
       // const userId = user.uid;
       var pastComments = null;
       if(grade != "Grade"){
            var pastComments = {
                commenter: userEmail,
                comment: newComment,
                grade: grade
            }
       }else if(newComment == null){
            alert("Comment cannot be blank.");
            return;
       }else{
            alert("A grade must be chosen.");
            return;
       }
        databaseAdmin.ref('users/commentHistory').push(pastComments)
          .then(() => {
          console.log('Data successfully written to the database');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error writing data to the database: ', error);
        });

        document.getElementById('addCommmentButton').addEventListener('onClick');
    }


    return (
        <div className = "wrapper-appform2" id="adminsubappform2Wrapper">
            <div className = "form-appform2">
                <div class="back-button">
                <   Link className="prev-page-link" onClick={handleAdminClick}><button class = "button2">Return to Previous Page</button></Link>
                </div>
                <div className = "grantTitle-appform">
                    <label for = "title-appform" class = "title-appform">Environmental Education and Citizen Science Grant</label>
                </div>
                <div className = "questionSection-appform">
                    <div className = "infoSection-appform2">
                        <div className = "row g-2 row-appform2">
                            <div class = "col-md">
                                <label for = "email">First Name</label>
                                <input type = "text" class = "form-control" id = "fname-appform2" value = ''
                                    onLoad = {handleInfoDisplay('firstName', 'fname-appform2')} className = "form-control user-info-field" 
                                    placeholder = "First Name" aria-label= "First Name" readOnly>
                                 </input>
                            </div>
                            <div class = "col-md">
                                <label for = "homephone">Last Name</label>
                                <input type = "text" class = "form-control" id = "lname-appform2" value = ''
                                    onLoad = {handleInfoDisplay("lastName", "lname-appform2")}
                                    placeholder = "Last Name" aria-label = "Last Name" readOnly>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className = "row g-2 row-appform2">
                        <div class = "col-md">
                            <label for = "email-appform2">Email</label>
                            <input type = "text" class = "form-control" id = "email-appform2" value = ''
                                onLoad = {handleInfoDisplay("email", "email-appform2")}
                                placeholder = "Email" aria-label = "Email" readOnly>
                            </input>
                        </div>
                        <div class = "col-md">
                            <label for = "phone-appform2">Phone</label>
                            <input type = "text" class = "form-control" id = "phone-appform2" value = ''
                                onLoad = {handleInfoDisplay("phone", "phone-appform2")}
                                placeholder = "Phone Number" aria-label = "Phone Number" readOnly>
                            </input>
                        </div>
                    </div>
                    <div className = "organizationName-appform2">
                        <label for = "organizationName-appform2" class = "organizationQ-appform2">What is the name of the organization that will receive the funding?</label>
                        <textarea type = "text" class = "form-control" id = "organization" value = ''
                            onLoad = {handleInfoDisplay("Organization", "organization")}
                            placeholder = "Organization" aria-label = "Organization" rows = "1" readOnly>
                        </textarea>
                    </div>
                    <div className = "title1-appform2">
                        <label for="title1-appform2" class="title1Q-appform2">Is this organization a Title 1 School?</label>
                        <div className = "Title1Selection-appform2">
                            <input type = "text" className = "title1select-appform2" id = "title1" value = ''
                                onLoad = {handleInfoDisplay("IsTitle1", "title1")} 
                                size = '3' readOnly>
                            </input>
                        </div>
                    </div>
                <div className = "funding-appform2">
                    <label for = "funding-appform2" class = "fundingQ-appform2">What is the amount of funding requested?</label>
                    <textarea type = "text" class = "form-control" id = "fundingQuestion-appform2" value = ''
                        onLoad = {handleInfoDisplay("FundingAmount", "fundingQuestion-appform2")}
                        placeholder = "Cannot exceed $1,500" aria-label = "Amount Requested" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "envEduc-appform2">
                    <label for = "envEduc-appform2" class = "envEducQ-appform2">What environmental education is addressed by this project?</label>
                    <textarea type = "text" class = "form-control" id = "envEducQuestion-appform2" 
                        onLoad = {handleInfoDisplay("EnvironmentalEducationAddressed", "envEducQuestion-appform2")}
                        placeholder = "..." aria-label = "Environmental Education Addressed" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "benefit-appform2">
                    <label for = "benefit-appform2" class = "benefitQ-appform2">Who will benefit? (Include information such as grade level(s) or ages, demographics, and number of participants.)</label>
                    <textarea type = "text" class = "form-control" id = "benefitQuestion-appform2" 
                        onLoad = {handleInfoDisplay("WhoBenefits", "benefitQuestion-appform2")}
                        placeholder = "Please include information such as grade level(s) or ages, demographics, and number of participants." aria-label = "Who will benefit?" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "objectives-appform2">
                    <label for = "objectives-appform2" class = "objectivesQ-appform2">What are the objectives?</label>
                    <textarea type = "text" class = "form-control" id = "objectivesQuestion-appform2" 
                        onLoad = {handleInfoDisplay("Objectives", "objectivesQuestion-appform2")}
                        placeholder = "..." aria-label = "Objectives of the Project" rows = "1" readOnly>                           
                    </textarea>
                </div>
                <div className = "projectGoals-appform2">
                    <label for = "projectGoals-appform2" class = "projectGoalsQ-appform2">How exactly will the project and/or materials contribute to San Joaquin Audubon’s goals of birding, 
                    conservation, restoration, and environmental literacy?</label>
                    <textarea type = "text" class = "form-control" id = "projectGoalsQuestion-appform2" 
                        onLoad = {handleInfoDisplay("ProjectGoals", "projectGoalsQuestion-appform2")}
                        placeholder = "..." aria-label = "How will the project contribute?" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "fundsExplanation-appform2">
                    <label for = "fundsExplanation-appform2" class = "fundsExplanationQ-appform2">Please include a brief explanation of how the funds will be used.</label>
                    <textarea type = "text" class = "form-control" id = "fundsExplanationQuestion-appform2" 
                        onLoad = {handleInfoDisplay("FundsExplanation", "fundsExplanationQuestion-appform2")}
                        placeholder = "Examples: bus expenses to go on an environmental field trip; binoculars for science camps; materials for building bird boxes and field trip fund to set up the boxes." 
                        aria-label = "Funding Explanation" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "startEndDates-appform2">
                    <label for = "startEndDates-appform2" class = "startEndDatesQ-appform2">List the start and end date of your project or state "Ongoing" for projects that continue.</label>
                    <textarea type = "text" class = "form-control" id = "startEndDatesQuestion-appform2" 
                        onLoad = {handleInfoDisplay("StartAndEndDates", "startEndDatesQuestion-appform2")}
                        placeholder = "Enter dates as: MM/DD/YYYY - MM/DD/YYYY" aria-label = "Enter dates as: MM/DD/YYYY - MM/DD/YYYY" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "feedback-appform2">
                    <label for = "feedback-appform2" class = "feedbackQ-appform2">Do you have any feedback or additional comments to make?</label>
                    <textarea type = "text" class = "form-control" id = "feedbackQuestion-appform2" value = '' 
                        onLoad = {handleInfoDisplay("Feedback", "feedbackQuestion-appform2")}
                        placeholder = "Feedback or Additional Comments" aria-label = "Feedback or Additional Comments" rows = "1" readOnly>
                    </textarea>
                </div>
            </div>   
            
                <div class="wrapper-status-current">
                    <div class="status-info-hold">
                        <label class="status-current-label" id= "statusDisplay">Current Status</label>
                    </div>
                    <label class="user-info-label" id= "statusDisplay1">Status</label>
                </div>

             
                <div class="wrapper-admin-feedback">
                    <div class="wrapper-new-comment">
                        <div class="admin-comments">
                            <textarea type="answer" class="form-control admin-comment-box" id="new-comment" aria-describedby="answerHelp" rows = "4"></textarea>
                        </div>
                        <div class="wrapper-feedback-buttons"> 
                            <div class="wrapper-comment-button">
                                <button onClick={postComment} id="addCommmentButton" class="add-comment-button" >Add Comment</button>
                            </div>
                            <div class="wrapper-small-feedback-buttons">
                                <div class="wrapper-status-button">
                                    <select class="form-select" id="floatingSelect1" aria-label="Filter drop down menu" onChange={statusChange}>
                                        <option selected id="statusOne" >Status</option>
                                        <option value="Under Review" > Set to Under Review</option>
                                        <option value="Approved">Set to Approved</option>
                                        <option value ="Unsatisfactory">Set to Unsatisfactory</option>
                                    </select>
                                </div>
                                <div class="wrapper-grade-button">
                                <select class="form-select" id="floatingSelect" aria-label="Filter drop down menu" onChange={handleChange}>
                                        <option value="Grade">Grade</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                        <option value="7">7</option>
                                        <option value="8">8</option>
                                        <option value="9">9</option>
                                        <option value="10">10</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wrapper-previous-comments" id="prev-comments">
                    </div>
                </div>
                <div class="back-button">
                <Link className="prev-page-link" onClick={handleAdminClick}><button class = "button2">Return to Previous Page</button></Link>
                </div>
            </div>
        </div>
    )
}
