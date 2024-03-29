import { React, useEffect, useState } from 'react'
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
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';
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
const storage = getStorage(app);

export function SubAppForm() {
    const history = useHistory();

    const handlePastClick = () => {
      history.push('/pastsubmissions');
      window.location.reload();
    };

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
                        console.log("NO DATA RETRIEVED");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
            hideFileUpload();
        });
    }

    function handleSelectionDisplay(field, id){
        const holdSelect = document.getElementById(id);
        app.auth().onAuthStateChanged((user) => {
            if(user) {
                const uid = user.uid;
                const dbRef = ref(database);
                // get data from database as a JSON object, and get each field
                get(child(dbRef, 'users/' + uid + '/forms/steve_stocking')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();
                        document.getElementById(id).innerHTML = data[field];
                        holdSelect.setAttribute('disabled', 'disabled');
                    } else {
                        console.log("NO DATA RETRIEVED");
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
                        console.log("NO DATA RETRIEVED");
                    }
                }).catch((error) => {
                    console.error(error);
                });
            }
        });
    }

    function disableReadOnly(){
         document.getElementById('q1').removeAttribute('disabled');
         document.getElementById('q2').removeAttribute('disabled');
         const enableTest = document.getElementsByClassName('user-input');
        for (let index = 0; index < enableTest.length; index++) {
         enableTest[index].removeAttribute('readOnly');
         
        }
     }
     function enableReadOnly() {
        const enableTest = document.getElementsByClassName('user-input');
        for (let index = 0; index < enableTest.length; index++) {
         enableTest[index].setAttribute('readOnly', true);
         
        }
        
     }
     function hideFileUpload(){
        const letterOfRecFileUpload = document.getElementById('letterDiv');
        const essayFileUpload = document.getElementById('essayDiv');

        letterOfRecFileUpload.style.display = 'none';
        essayFileUpload.style.display = 'none';
     }
     function showFileUpload(){
        const letterOfRecFileUpload = document.getElementById('letterDiv');
        const essayFileUpload = document.getElementById('essayDiv');

        letterOfRecFileUpload.style.display = 'block';
        essayFileUpload.style.display = 'block';
     }
 
     function handleUpdateApp() {
         let updatePass = false;
         app.auth().onAuthStateChanged((user) => {
             if(user) {
                 const uid = user.uid;
                 const dbRef = ref(database);
                 // get data from database as a JSON object, and get each field
                 get(child(dbRef, 'users/' + uid + '/forms/steve_stocking')).then((snapshot) => {
                     if (snapshot.exists()) {
                         const data = snapshot.val();
                         //get elements
                         const fname = document.getElementById('fname').value;
                        const lname = document.getElementById('lname').value;
                        const birthday = document.getElementById('birthday').value;
                        const email = document.getElementById('email').value;
                        const phone = document.getElementById('phone').value;
                        const address = document.getElementById('address').value;
                        const city = document.getElementById('city').value;
                        const state = document.getElementById('state').value;
                        const zip = document.getElementById('zip').value;
                        const q1 = document.getElementById('q1').value;
                        const q2 = document.getElementById('q2').value;
                        const q3 = document.getElementById('q3').value;
                        const q4 = document.getElementById('q4').value;

                        const letterFileInput = document.getElementById('letterFile');
                        const letterFile = letterFileInput.files[0];
        
                        const essayFileInput = document.getElementById('essayFile');
                        const essayFile = essayFileInput.files[0];
                         
                         // Error checking to see if any of the fields are empty
                         if(!fname || !lname || !birthday || !email || !phone || !address || !city || !state || !zip || !q1 || !q2 || !q3 || !q4) {   
                             document.getElementById('error-messageSS').textContent = 'Please fill out all fields';
                             return;
                         }
 
                         // Check if first name and last name contain only characters
                         if(!/^[A-Za-z\s]+$/.test(fname) || !/^[A-Za-z\s]+$/.test(lname)) {
                             document.getElementById('error-messageSS').textContent = 'First Name and Last Name should contain only letters';
                             return;
                         }

                         if(!/^\d{2}\/\d{2}\/\d{4}$/.test(birthday)){
                            document.getElementById('error-messageSS').textContent = 'Please enter a valid birthday: MM/DD/YYYY';
                            return;
                         }
 
                         //Check if email is valid
                         if(!/\S+@\S+\.\S+/.test(email)) {
                             document.getElementById('error-messageSS').textContent = 'Please enter a valid email address';
                             return;
                         }
 
                         // Check if home phone number contains only numbers and optional hyphens
                         if(!/^[0-9-]+$/.test(phone)) {
                             document.getElementById('error-messageSS').textContent = 'Phone number should contain only numbers';
                             return;
                         }
                        
                         //Check if address contains only letters and numbers
                         if(!/^[A-Za-z0-9\s]+$/.test(address)){
                            document.getElementById('error-messageSS').textContent = 'Address should only contain letters and numbers';
                            return;
                         }

                         //Check if city and state only contain letters
                         if(!/^[A-Za-z\s]+$/.test(city) || !/^[A-Za-z\s]+$/.test(state)){
                            document.getElementById('error-messageSS').textContent = 'Check if city and/or state contain only letters.';
                            return;
                         }

                         //Check if zip code only contains numbers
                         if(!/^[0-9]+$/.test(zip)){
                            document.getElementById('error-messageSS').textContent = 'Zip code should only contain numbers.';
                            return;
                         }

                         if(q1 === "Select" && q2 === "Select") {    
                            document.getElementById('error-messageSS').textContent = 'Please select either Yes or No';
                            return;
                        }
                        
                        // Check if the user selected an option for question 1
                        if(q1 !== "Yes" && q1 !== "No") {
                            document.getElementById('error-messageSS').textContent = 'Please select Yes or No if you, or a parent or guardian, a member of the San Joaquin Audubon Society';
                            return;
                        }

                        // Check if the user selected an option for question 2
                        if(q2 !== "Yes" && q2 !== "No") {
                            document.getElementById('error-messageSS').textContent = 'Please select Yes or No for if you live in San Joaquin County';
                            return;
                        }

                         //update info in database
                         if (fname !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                firstName: fname
                            })
                        }
                        if (lname !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                lastName: lname
                            })
                        }
                        if (birthday !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                birthday: birthday
                            })
                        }
                        if (email !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                email: email
                            })
                        }
                        if (phone !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                phone: phone
                            })
                        }
                        if (address !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                address: address
                            })
                        }
                        if (city !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                city: city
                            })
                        }
                        if (state !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                state: state
                            })
                        }
                        if (zip !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                zip: zip
                            })
                        }
                        if (q1 !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                question1: q1
                            })
                        }
                        if (q2 !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                question2: q2
                            })
                        }
                        if (q3 !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                question3: q3
                            })
                        }
                        if (q4 !== "") {
                            update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                                question4: q4
                            })
                        }

                        // Upload the letter of recommendation file
                        const fileUploadPromises = [];

                        if (letterFile) {
                            // Create a storage reference for the letter of recommendation file
                            const letterStorageRef = storageRef(storage, `users/${uid}/forms/steve_stocking/letter_of_recommendation.pdf`);
                            const uploadLetterPromise = uploadBytes(letterStorageRef, letterFile)

                                // Get download link
                                .then((snapshot) => {
                                    return getDownloadURL(letterStorageRef);
                                })
                                .then((letterDownloadURL) => {
                                    // Update the database with the download URL
                                    return update(ref(database, `users/${uid}/forms/steve_stocking`), {
                                        urlLinkLetter: letterDownloadURL
                                    });
                                });

                            // Add the promise to the array
                            fileUploadPromises.push(uploadLetterPromise);
                        }

                        if (essayFile) {
                            // Create a storage reference for the personal essay file
                            const essayStorageRef = storageRef(storage, `users/${uid}/forms/steve_stocking/personal_essay.pdf`);
                            const uploadEssayPromise = uploadBytes(essayStorageRef, essayFile)

                                // Get download link
                                .then((snapshot) => {
                                    return getDownloadURL(essayStorageRef);
                                })
                                .then((essayDownloadURL) => {
                                    // Update the database with the download URL
                                    return update(ref(database, `users/${uid}/forms/steve_stocking`), {
                                        urlLinkEssay: essayDownloadURL
                                    });
                                });

                            // Add the promise to the array
                            fileUploadPromises.push(uploadEssayPromise);
                        }

                        // Use Promise.all() to wait for all file uploads and database updates
                        Promise.all(fileUploadPromises)
                            .then(() => {
                                // All uploads and updates completed successfully
                                window.location.reload();
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                         
                         alert('Your Application has been Updated');
                         enableReadOnly();
                         document.getElementById('error-message').textContent = '';
                         window.location.reload();

                         
                        
                     } else {
                         console.log("NO DATA");
                        
                     }
                 }).catch((error) => {
                     console.error(error);
                 });
             }
         });

     }
    
 
     function handleEditClick(){
        app.auth().onAuthStateChanged((user) => {
            if(user) {
                const uid = user.uid;
                const dbRef = ref(database);
                const elementTest =  document.getElementsByClassName('form-control');
                const elTest = document.querySelectorAll('input');
                
                // get data from database as a JSON object, and get each field
                get(child(dbRef, 'users/' + uid + '/forms')).then((snapshot) => {
                    if (snapshot.exists()) {
                        const data = snapshot.val();

                        //check lock status
                        if (!data["_LockStatus"]) {
                            //change  button text based on the past
                               
                            if (document.getElementById('editButton').value == "Resubmit") {
                                handleUpdateApp();
   
                                   
                            } else {
                                document.getElementById('editButton').value = "Resubmit";
                                   
                                document.getElementById('editButton').textContent = "Resubmit"; 
                                disableReadOnly();
                                alert('You can now edit your Application. Click resubmit button when you are done making changes.');
                                showFileUpload();
                            }
                               
                        } else {
                            alert('Application is locked');
                            document.getElementById('editButton').textContent = "Application Locked";
                            document.getElementById('editButton').disabled = true;
                        }                      
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
                                    <input type = "text" id = 'fname' onLoad = {handleInfoDisplay('firstName', 'fname')} className = "form-control user-info-field user-input" placeholder = "First Name" aria-label= "First Name" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "lname">Last Name</label>
                                    <input type = "text" id = 'lname' onLoad = {handleInfoDisplay('lastName', 'lname')} className = "form-control user-info-field user-input" placeholder = "Last Name" aria-label= "Last Name" readOnly></input>
                                </div>
                            </div>
                            <div className = "row g-3 row-appform">
                                <div className = "col-md">
                                    <label for = "birthday">Birth Date (mm/dd/yyyy)</label>
                                    <input type = "text" id = 'birthday' onLoad = {handleInfoDisplay('birthday', 'birthday')} className = "form-control user-info-field user-input" placeholder = "Birth Date (mm/dd/yy)" aria-label = "Birth Date (mm/dd/yy)" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "email">Email</label>
                                    <input type = "text" id = 'email' onLoad = {handleInfoDisplay('email', 'email')} className = "form-control user-info-field user-input" placeholder = "Email" aria-label = "Email" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "homephone">Home Phone</label>
                                    <input type = "text" id = 'phone'  onLoad = {handleInfoDisplay('phone', 'phone')} className = "form-control user-info-field user-input" placeholder = "Home Phone" aria-label = "Home Phone" readOnly></input>
                                </div>
                            </div>
                            <div className = "row g-3 row-appform">
                                <div className = "col-md">
                                    <label for = "address">Address</label>
                                    <input type = "text" id = 'address' onLoad = {handleInfoDisplay('address', 'address')} className = "form-control user-info-field user-input" placeholder = "Address" aria-label = "Address" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "city">City</label>
                                    <input type = "text" id = 'city' onLoad = {handleInfoDisplay('city', 'city')} className = "form-control user-info-field user-input" placeholder = "City" aria-label = "City" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "state">State</label>
                                    <input type = "text" id = 'state'  onLoad = {handleInfoDisplay('state', 'state')} className = "form-control user-info-field user-input" placeholder = "State" aria-label = "State" readOnly></input>
                                </div>
                                <div className = "col-md">
                                    <label for = "zip">ZIP Code</label>
                                    <input type = "text" id = 'zip' onLoad = {handleInfoDisplay('zip', 'zip')} className = "form-control user-info-field user-input" placeholder = "ZIP Code" aria-label = "ZIP Code" readOnly></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "q1-subappform">
                        <label for="q1-subappform" className="form-label-subappform2">Are you, or a parent or guardian, a member of the San Joaquin Audubon Society?</label>
                        <div className = "Q1Selection-subappform">
                            <select className = "q1Select-subappform" id="q1" onLoad={handleSelectionDisplay('question1','YOrNQ1')} disabled>
                                <option id="YOrNQ1"> Select</option>
                                <option value = "Yes">Yes</option>
                                <option value = "No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className = "q2-subappform">
                        <label for="question2Text" className="form-label-subappform2">Do you live in San Joaquin County?</label>
                        <div className = "Q1Selection-subappform">
                            <select className = "q2Select-subappform" id="q2" onLoad={handleSelectionDisplay('question2','YOrNQ2')} disabled>
                                <option id="YOrNQ2"> Select</option>
                                <option value = "Yes">Yes</option>
                                <option value = "No">No</option>
                            </select>
                        </div>

                    </div>
                    <div className = "q3-subappform">
                        <label for="question3Text" className="form-label-subappform2">Which camp or program do you want to attend?</label>
                        <div class="wrapper-user-answer">
                            <textarea class="form-control user-input" id = 'q3' rows="4" onLoad = {handleInfoDisplay('question3', 'q3')} readOnly>
                            </textarea>
                        </div>                         
                    </div>
                    <div className = "q4-subappform">
                        <label for="question4Text" className="form-label-subappform2">Do you have any feedback for us?</label>
                        <div className="wrapper-user-answer">
                        <textarea className="form-control user-input" id = 'q4' rows="4" onLoad = {handleInfoDisplay('question4', 'q4')} readOnly>
                        </textarea>       
                        </div> 
                    </div>                  
                    <div className = "q5-subappform">
                        <label for="question5Text" className="form-label-appform5">Please submit a letter of recommendation from a teacher, parent, or adult friend that should cover what they know about your interest in learning about the environment, nature, or birds.</label>
                    </div>

                    <div className = "uploadButtonLetterOfRec-appform" id='letterDiv'>
                        <input type = "file" id = "letterFile" name = "letter"></input>
                    </div>
                    <div className = "uploadButtonLetterOfRec-subappform">
                        
                            <a className = "letterLink" id = "letterLinkID" href='#' target = "blank" onLoad = {handleURLDisplay('urlLinkLetter', 'letterLinkID')}>
                                letter_of_recommendation.pdf
                            </a>
                    
                    </div>
                    <div className = "q6-subappform">
                        <label for="question6Text" className="form-label-appform6">Please also submit a personal essay that states the importance of attending an environmental, nature, or birding camp or program to you. The essay should not be more than 2 pages long. Do you try to teach others about nature or birds? Do you draw trees, plants, birds, or other animals in nature you see? We want to know about your interest in the environment and nature.</label>
                    </div>
                    <div className = "uploadButtonEssay-appform" id='essayDiv'>
                        <input type = "file" id = "essayFile" name = "essay"></input>
                    </div>
                    <div className = "uploadButtonEssay-subappform">
                        <a className = "essayLink" id = "essayLinkID" href='#' target = "blank" onLoad = {handleURLDisplay('urlLinkEssay', 'essayLinkID')}>
                            personal_essay.pdf</a>
                    </div>
                    <div className="error-message" id="error-messageSS">
                    </div>  
                </div>
                <div className="text-center-appform2" >
                    <button className = "button1-subappform" id='editButton' value="Edit Application" onClick={handleEditClick}>Edit Application</button>
                </div>
                <div className = "buttonWrapper1-subappform" >
                    <div className="text-center-subappform">
                        <Link onClick={handlePastClick}><button className = "button1-subappform">Return to Past Submissions</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}