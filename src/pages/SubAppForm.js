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
        onAuthStateChanged(auth, (currentUser) => {
            if (currentUser && !done) {
                // User is signed in, do nothing
                done = true;
            } else if (!currentUser && !done) {
                // User is signed out
                done = true;
                document.getElementById('subAppFormWrapper').style.visibility = "hidden";
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
            hideFileUpload();
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

    function disableReadOnly(){
        // document.getElementsByClassName('form-control').removeAttribute('readOnly');
         //document.getElementById('fname-appform2').removeAttribute('readOnly');
         const enableTest = document.getElementsByClassName('user-input');
        for (let index = 0; index < enableTest.length; index++) {
         enableTest[index].removeAttribute('readOnly');
         
        }
     }
     function enableReadOnly() {
         //const enableSelect = document.getElementsByClassName('')
        // document.getElementById('fname-appform2').setAttribute('readOnly', true);
        //document.getElementsByClassName('form-control').setAttribute('readOnly', true);
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
                             //alert('Please fill out all fields.');       
                             document.getElementById('error-message').textContent = 'Please fill out all fields';
                             return;
                         }
 
                         // Check if first name and last name contain only characters
                         if(!/^[A-Za-z\s]+$/.test(fname) || !/^[A-Za-z\s]+$/.test(lname)) {
                             //alert('First Name and Last Name should contain only letters.');
                             document.getElementById('error-message').textContent = 'First Name and Last Name should contain only letters';
                             return;
                         }

                         if(!/^\d{2}\/\d{2}\/\d{4}$/.test(birthday)){
                            //alert('Please enter a valid birthday: MM/DD/YYYY.');
                            document.getElementById('error-message').textContent = 'Please enter a valid birthday: MM/DD/YYYY';
                            return;
                         }
 
                         //Check if email is valid
                         if(!/\S+@\S+\.\S+/.test(email)) {
                             //alert('Please enter a valid email address.');
                             document.getElementById('error-message').textContent = 'Please enter a valid email address';
                             return;
                         }
 
                         // Check if home phone number contains only numbers and optional hyphens
                         if(!/^[0-9-]+$/.test(phone)) {
                             //alert('Phone number should contain only numbers');
                             document.getElementById('error-message').textContent = 'Phone number should contain only numbers';
                             return;
                         }
                        
                         //Check if address contains only letters and numbers
                         if(!/^[A-Za-z0-9\s]+$/.test(address)){
                            //alert('Address should only contain letters and numbers');
                            document.getElementById('error-message').textContent = 'Address should only contain letters and numbers';
                            return;
                         }

                         //Check if city and state only contain letters
                         if(!/^[A-Za-z\s]+$/.test(city) || !/^[A-Za-z\s]+$/.test(state)){
                            //alert('Check if city and/or state contain only letters.');
                            document.getElementById('error-message').textContent = 'Check if city and/or state contain only letters.';
                            return;
                         }

                         //Check if zip code only contains numbers
                         if(!/^[0-9]+$/.test(zip)){
                            //alert('Zip code should only contain numbers');
                            document.getElementById('error-message').textContent = 'Zip code should only contain numbers.';
                            return;
                         }

                         if(q1 === "Select" && q2 === "Select") {
                            //alert('Please fill out all fields.');       
                            document.getElementById('error-message').textContent = 'Please select either yes or no in the dropdown menu';
                            return;
                        }

                        // Check if the user selected an option for question 1
                        if(q1 === "Select") {
                            //alert('Please select if you are a member of the San Joaquin Audubon Society or not.');
                            document.getElementById('error-message').textContent = 'Please select if you are a member of the San Joaquin Audubon Society or not';
                            return;
                        }

                        // Check if the user selected an option for question 2
                        if(q2 === "Select") {
                            //alert('Please select if you live in San Joaquin County or not.');
                            document.getElementById('error-message').textContent = 'Please select if you live in San Joaquin County or not';
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
                                alert('Successfully submitted. You can now view your submission in the Past Submissions.');
                                // Page reload
                                //window.location.href = '/applicationformpage';
                                window.location.reload();
                            })
                            .catch((error) => {
                                console.error('Error:', error);
                            });
                         
                         alert('Your Application has been Updated');
                         enableReadOnly();
                         console.log(updatePass);
                         updatePass = true;
                         console.log(updatePass);
                         document.getElementById('error-message').textContent = '';
                         window.location.reload();
                         return updatePass;
                         
                        
                     } else {
                         console.log("NO DATA");
                         return updatePass;
                        
                     }
                 }).catch((error) => {
                     console.error(error);
                 });
             }
         });
         console.log(updatePass);
         return updatePass;
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
                        //document.getElementById(id).value = data[field];

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

        // //Check user database for the lock state of the submission
        // function checkLockState(){
        //     app.auth().onAuthStateChanged((user) => {
        //         if(user){
        //             const uid = user.uid;
        //             const database = firebase.database(app);
        //             const lockState = database.ref('users/' + uid + '/forms/steve_stocking/lockState');
        //             lockState.on('value', (snapshot) => {
        //             const data = snapshot.val();
        //             const lockStateStatus = data;
    
        //             if(lockStateStatus === "unlocked"){
        //                 const elements = document.getElementsByClassName("user-input");
        //                 for (let i = 0; i < elements.length; i++) {
        //                     elements[i].removeAttribute("readonly");
        //                 }
        //             }
        //             else{
        //                 return;
        //             }
        //           });
        //         }
        //     })
        // }
        // checkLockState();

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
                                    <label for = "birthday">Birth Date (mm/dd/yy)</label>
                                    <input type = "text" id = 'birthday' onLoad = {handleInfoDisplay('birthday', 'birthday')} className = "form-control user-info-field user-input" placeholder = "Birth Date (mm/dd/yy)" aria-label = "Birth Date (mm/dd/yyyy)" readOnly></input>
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
                        <label for="question1Text" className="form-label-subappform2">Are you, or a parent or guardian, a member of the San Joaquin Audubon Society?</label>
                        <div className = "Q1Selection-subappform">
                            <input type = 'text' className = "q1select-subappform user-input" id = 'q1' onLoad = {handleInfoDisplay('question1', 'q1')} size = '2' readOnly></input>
                        </div>
                    </div>
                    <div className = "q2-subappform">
                        <label for="question2Text" className="form-label-subappform2">Do you live in San Joaquin County?</label>
                        <div className = "Q1Selection-subappform">
                            <input type = 'text'  className = "q2select-subappform user-input" id = 'q2' onLoad = {handleInfoDisplay('question2', 'q2')} size = '2' readOnly></input>
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