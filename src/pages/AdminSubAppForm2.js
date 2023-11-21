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


export function AdminSubAppForm2({uid}) {
    const history = useHistory();

    //Path references for EnvironmentalEducation_CitizenScience application and _GrantStatus
    const dataUp = ref(database,'users/'+ uid +'/forms/EnvironmentalEducation_CitizenScience');
    const statusNow = ref(database,'users/'+ uid +'/forms/EnvironmentalEducation_CitizenScience/_GrantStatus');
        
    //holds the value of _GrantStatus from the database
    var loadStatus ='';
    //get current value of grant status
    onValue(statusNow, (snapshot) => {
        loadStatus = snapshot.val();
        document.getElementById('statusDisplay2').innerHTML= loadStatus;
        document.getElementById('floatingSelect2').value = loadStatus;
    })

    const handleAdminClick = () => {
        history.push('/adminportal');
        window.location.reload();
    };

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

    const getInitialState = () =>{
        const value = "Grade";
        return value;
    }

    const [grade, setGrade] = useState(getInitialState);
    const [status, setStatus] = useState(statusNow);

    const handleChange = (e) => {
        setGrade(e.target.value);
    };

    function handleInfoDisplay(field, id, uid) {
        const dbRef = ref(database);
        const element = document.getElementById(id);

        if(element){
            // Replace the hardcoded path with the actual path to the user's data in the database
            get(child(dbRef, 'users/' + uid + '/forms/EnvironmentalEducation_CitizenScience')).then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    if(data && data[field] !== undefined){
                        console.log("data = " + data);
                        console.log("field data =" + data[field]);
                        console.log("id = " + id);
                        element.value = data[field];
                    }else{
                        console.log("Field not found in data");
                    }
                } else {
                    console.log("NO DATA RETRIEVED");
                }
            }).catch((error) => {
                console.error(error);
            });
        }
    }
    
    //function that runs when you change status
    function statusChange(){
        //update to database
        const newStatus = document.getElementById('floatingSelect2').value;
        update(dataUp,{_GrantStatus: newStatus});  
    }

    //function that runs when you change status
        function statusChange(){
            onValue(statusNow, (snapshot) => {
                setStatus(snapshot.val());
            })
            const newStatus = document.getElementById('floatingSelect2').value;
            if(status == 'Approved' && window.confirm('Application is currently approved, you sure you want to change it?')){
                update(dataUp,{_GrantStatus: newStatus});
            }else if(status == 'Approved' && !window.confirm('Application is currently approved, you sure you want to change it?')){
                    
            }else{
                update(dataUp,{_GrantStatus: newStatus});
            }
        }

    function getComments(uid) {
        const databaseAdmin = firebase.database(adminApp);
    
        var pastComments = databaseAdmin.ref('users/' + uid + '/forms/EnvironmentalEducation_CitizenScience/comments');
        pastComments.on('value', (snapshot) => {
            let commentsHTML = '';
            snapshot.forEach((snapshot) => {
                const commenter = snapshot.val().commenter;
                const comment = snapshot.val().comment;
                if (snapshot.val().grade != null) {
                    commentsHTML += `<div id="comment-text-div">
                                        ${commenter} | Grade : ${snapshot.val().grade} <br />&emsp;${comment}
                                    </div>`;
                } else {
                    commentsHTML += `<div id="comment-text-div">
                                        ${commenter} | Grade : NONE <br />&emsp;${comment}
                                    </div>`;
                }
            });
            updateCommentSection(commentsHTML);
        });
    }

    function updateCommentSection(commentsHTML) {
        var prevComments = document.getElementById("prev-comments2");
        prevComments.innerHTML = commentsHTML;
    }
   getComments(uid);


    function postComment(){
        var newComment2 = document.getElementById("new-comment2").value;
        document.getElementById("addCommmentButton2").id = "addCommmentButton2";

        const databaseAdmin = firebase.database(adminApp);
       var pastComments = null;
       
       if(newComment2 == ""){
        alert("Comment cannot be blank.");
        return;
       }
       
       if(grade != "Grade"){
            var pastComments = {
                commenter: userEmail,
                comment: newComment2,
                grade: grade
            }
       }else{
            alert("A grade must be chosen.");
            return;
       }
        databaseAdmin.ref('users/' + uid + '/forms/EnvironmentalEducation_CitizenScience/comments').push(pastComments)
          .then(() => {
          console.log('Data successfully written to the database');
        })
        .catch((error) => {
          console.error('Error writing data to the database: ', error);
        });

        document.getElementById('addCommmentButton2').addEventListener('onClick');
    }


    return (
        <div className = "wrapper-appform2" id="adminsubappform2Wrapper">
            <hr class="form-divider"></hr>
            <div className = "form-appform2">
                <div className = "grantTitle-appform">
                    <label for = "title-appform" class = "title-appform">Environmental Education and Citizen Science Grant</label>
                </div>
                <div className = "questionSection-appform">
                    <div className = "infoSection-appform2">
                        <div className = "row g-2 row-appform2">
                            <div class = "col-md">
                                <label for = "email">First Name</label>
                                <input type = "text" class = "form-control" id = "fname-appform2" value = ''
                                    onLoad = {handleInfoDisplay('firstName', 'fname-appform2', uid)} className = "form-control user-info-field" 
                                    placeholder = "First Name" aria-label= "First Name" readOnly>
                                 </input>
                            </div>
                            <div class = "col-md">
                                <label for = "homephone">Last Name</label>
                                <input type = "text" class = "form-control" id = "lname-appform2" value = ''
                                    onLoad = {handleInfoDisplay("lastName", "lname-appform2", uid)}
                                    placeholder = "Last Name" aria-label = "Last Name" readOnly>
                                </input>
                            </div>
                        </div>
                    </div>
                    <div className = "row g-2 row-appform2">
                        <div class = "col-md">
                            <label for = "email-appform2">Email</label>
                            <input type = "text" class = "form-control" id = "email-appform2" value = ''
                                onLoad = {handleInfoDisplay("email", "email-appform2", uid)}
                                placeholder = "Email" aria-label = "Email" readOnly>
                            </input>
                        </div>
                        <div class = "col-md">
                            <label for = "phone-appform2">Phone</label>
                            <input type = "text" class = "form-control" id = "phone-appform2" value = ''
                                onLoad = {handleInfoDisplay("phone", "phone-appform2", uid)}
                                placeholder = "Phone Number" aria-label = "Phone Number" readOnly>
                            </input>
                        </div>
                    </div>
                    <div className = "organizationName-appform2">
                        <label for = "organizationName-appform2" class = "organizationQ-appform2">What is the name of the organization that will receive the funding?</label>
                        <textarea type = "text" class = "form-control" id = "organization" value = ''
                            onLoad = {handleInfoDisplay("Organization", "organization", uid)}
                            placeholder = "Organization" aria-label = "Organization" rows = "1" readOnly>
                        </textarea>
                    </div>
                    <div className = "title1-appform2">
                        <label for="title1-appform2" class="title1Q-appform2">Is this organization a Title 1 School?</label>
                        <div className = "Title1Selection-appform2">
                            <input type = "text" className = "title1select-appform2" id = "title1" value = ''
                                onLoad = {handleInfoDisplay("IsTitle1", "title1", uid)} 
                                size = '3' readOnly>
                            </input>
                        </div>
                    </div>
                <div className = "funding-appform2">
                    <label for = "funding-appform2" class = "fundingQ-appform2">What is the amount of funding requested?</label>
                    <textarea type = "text" class = "form-control" id = "fundingQuestion-appform2" value = ''
                        onLoad = {handleInfoDisplay("FundingAmount", "fundingQuestion-appform2", uid)}
                        placeholder = "Cannot exceed $1,500" aria-label = "Amount Requested" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "envEduc-appform2">
                    <label for = "envEduc-appform2" class = "envEducQ-appform2">What environmental education is addressed by this project?</label>
                    <textarea type = "text" class = "form-control" id = "envEducQuestion-appform2" 
                        onLoad = {handleInfoDisplay("EnvironmentalEducationAddressed", "envEducQuestion-appform2", uid)}
                        placeholder = "..." aria-label = "Environmental Education Addressed" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "benefit-appform2">
                    <label for = "benefit-appform2" class = "benefitQ-appform2">Who will benefit? (Include information such as grade level(s) or ages, demographics, and number of participants.)</label>
                    <textarea type = "text" class = "form-control" id = "benefitQuestion-appform2" 
                        onLoad = {handleInfoDisplay("WhoBenefits", "benefitQuestion-appform2", uid)}
                        placeholder = "Please include information such as grade level(s) or ages, demographics, and number of participants." aria-label = "Who will benefit?" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "objectives-appform2">
                    <label for = "objectives-appform2" class = "objectivesQ-appform2">What are the objectives?</label>
                    <textarea type = "text" class = "form-control" id = "objectivesQuestion-appform2" 
                        onLoad = {handleInfoDisplay("Objectives", "objectivesQuestion-appform2", uid)}
                        placeholder = "..." aria-label = "Objectives of the Project" rows = "1" readOnly>                           
                    </textarea>
                </div>
                <div className = "projectGoals-appform2">
                    <label for = "projectGoals-appform2" class = "projectGoalsQ-appform2">How exactly will the project and/or materials contribute to San Joaquin Audubon’s goals of birding, 
                    conservation, restoration, and environmental literacy?</label>
                    <textarea type = "text" class = "form-control" id = "projectGoalsQuestion-appform2" 
                        onLoad = {handleInfoDisplay("ProjectGoals", "projectGoalsQuestion-appform2", uid)}
                        placeholder = "..." aria-label = "How will the project contribute?" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "fundsExplanation-appform2">
                    <label for = "fundsExplanation-appform2" class = "fundsExplanationQ-appform2">Please include a brief explanation of how the funds will be used.</label>
                    <textarea type = "text" class = "form-control" id = "fundsExplanationQuestion-appform2" 
                        onLoad = {handleInfoDisplay("FundsExplanation", "fundsExplanationQuestion-appform2", uid)}
                        placeholder = "Examples: bus expenses to go on an environmental field trip; binoculars for science camps; materials for building bird boxes and field trip fund to set up the boxes." 
                        aria-label = "Funding Explanation" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "startEndDates-appform2">
                    <label for = "startEndDates-appform2" class = "startEndDatesQ-appform2">List the start and end date of your project or state "Ongoing" for projects that continue.</label>
                    <textarea type = "text" class = "form-control" id = "startEndDatesQuestion-appform2" 
                        onLoad = {handleInfoDisplay("StartAndEndDates", "startEndDatesQuestion-appform2", uid)}
                        placeholder = "Enter dates as: MM/DD/YYYY - MM/DD/YYYY" aria-label = "Enter dates as: MM/DD/YYYY - MM/DD/YYYY" rows = "1" readOnly>
                    </textarea>
                </div>
                <div className = "feedback-appform2">
                    <label for = "feedback-appform2" class = "feedbackQ-appform2">Do you have any feedback or additional comments to make?</label>
                    <textarea type = "text" class = "form-control" id = "feedbackQuestion-appform2" value = '' 
                        onLoad = {handleInfoDisplay("Feedback", "feedbackQuestion-appform2", uid)}
                        placeholder = "Feedback or Additional Comments" aria-label = "Feedback or Additional Comments" rows = "1" readOnly>
                    </textarea>
                </div>
            </div>   
            <div class="divider" />
                <div class="wrapper-status-current">
                    <div class="status-info-hold">
                        <label class="status-current-label" id= "statusDisplay">Current Status</label>
                    </div>
                    <label class="user-info-label" id= "statusDisplay2">Status</label>
                </div>

             
                <div class="wrapper-admin-feedback">
                    <div class="wrapper-new-comment">
                        <div class="admin-comments">
                            <textarea type="answer" class="form-control admin-comment-box" id="new-comment2" aria-describedby="answerHelp" rows = "4"></textarea>
                        </div>
                        <div class="wrapper-feedback-buttons"> 
                            <div class="wrapper-comment-button">
                                <button onClick={postComment} id="addCommmentButton2" class="add-comment-button" >Add Comment</button>
                            </div>
                            <div class="wrapper-small-feedback-buttons">
                                <div class="wrapper-status-button">
                                    <select class="form-select" id="floatingSelect2" aria-label="Filter drop down menu" onChange={statusChange}>
                                        <option selected id="statusTwo" >Status</option>
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
                    <div class="wrapper-previous-comments" id="prev-comments2">
                    </div>
                </div>
            </div>
        </div>
    )
}
