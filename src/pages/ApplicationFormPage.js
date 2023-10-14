import { React, useEffect } from 'react'
import '../css/ApplicationFormPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { useHistory } from 'react-router-dom';
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, child, get, onValue, push, update } from 'firebase/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
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

export function ApplicationFormPage() {
    const history = useHistory();

    const handleGrantClick = () => {
        history.push('/grantselection');
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
                document.getElementById('appFormWrapper').style.visibility = "hidden";
                history.push('/login');
                window.location.reload();
                console.error(401);
                return;
            }
        });
    }, [auth, history]);

    function handleSubmit() {
        app.auth().onAuthStateChanged(function (user) {
            if (user) {
                const uid = user.uid;

                // Check if the user has already submitted a form
                const userFormRef = ref(database, `users/${uid}/forms/steve_stocking`);
                get(userFormRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        // User has already submitted a form
                        //alert("You already submitted a form. You can't resubmit. Please contact one of the admins in order to edit your submission.");
                        document.getElementById('error-message').textContent = "You already submitted a form. You can't resubmit. Please contact one of the admins in order to edit your submission.";
                        return;
                    }

                    else {
                        const _AppID = uid + "_0";
                        const currDate = new Date();
                        const month = currDate.getMonth() + 1;
                        const year = currDate.getFullYear();
                        const date = currDate.getDate();
                        const time = currDate.getHours() + ":" + currDate.getMinutes() + ":" + currDate.getSeconds();
                        const today = month + "/" + date + "/" + year;
                        // get each field's data
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
                        if (!fname || !lname || !birthday || !email || !phone || !address || !city || !state || !zip || !q1 || !q2 || !q3 || !letterFile || !essayFile) {
                            //alert('Please fill out all fields.');       
                            document.getElementById('error-message').textContent = 'Please fill out all fields and make sure you submitted the required files';
                            return;
                        }

                        // Check if first name and last name contain only characters
                        if (!/^[A-Za-z\s]+$/.test(fname) || !/^[A-Za-z\s]+$/.test(lname)) {
                            //alert('First Name and Last Name should contain only letters.');
                            document.getElementById('error-message').textContent = 'First Name and Last Name should contain only letters';
                            return;
                        }

                        // Check if birthday is in the "xx/xx/xxxx" format
                        if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(birthday)) {
                            //alert('Please enter a valid birthday in the format "xx/xx/xxxx".');
                            document.getElementById('error-message').textContent = 'Please enter a valid birthday in the format "xx/xx/xxxx"';
                            return;
                        }

                        // Checks if email is valid
                        if (!/\S+@\S+\.\S+/.test(email)) {
                            //alert('Please enter a valid email address.');
                            document.getElementById('error-message').textContent = 'Please enter a valid email address';
                            return;
                        }

                        // Check if home phone number contains only numbers and optional hyphens
                        if (!/^[0-9-]+$/.test(phone)) {
                            //alert('Phone number should contain only numbers');
                            document.getElementById('error-message').textContent = 'Phone number should contain only numbers';
                            return;
                        }

                        // Check if city and state contain only characters
                        if (!/^[A-Za-z\s]+$/.test(city) || !/^[A-Za-z\s]+$/.test(state)) {
                            //alert('City and State should contain only letters and spaces.');
                            document.getElementById('error-message').textContent = 'City and State should contain only letters';
                            return;
                        }

                        // Check if ZIP code contains only numbers
                        if (!/^\d+$/.test(zip)) {
                            //alert('ZIP Code should contain only numbers.');
                            document.getElementById('error-message').textContent = 'ZIP Code should contain only numbers';
                            return;
                        }

                        if (q1 === "Select" && q2 === "Select") {
                            //alert('Please fill out all fields.');       
                            document.getElementById('error-message').textContent = 'Please select either yes or no in the dropdown menu';
                            return;
                        }

                        // Check if the user selected an option for question 1
                        if (q1 === "Select") {
                            //alert('Please select if you are a member of the San Joaquin Audubon Society or not.');
                            document.getElementById('error-message').textContent = 'Please select if you are a member of the San Joaquin Audubon Society or not';
                            return;
                        }

                        // Check if the user selected an option for question 2
                        if (q2 === "Select") {
                            //alert('Please select if you live in San Joaquin County or not.');
                            document.getElementById('error-message').textContent = 'Please select if you live in San Joaquin County or not';
                            return;
                        }

                        // if the field is not empty, update the database with the information
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
                        update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                            _AppID: _AppID
                        });
                        update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                            _GrantName: "Steve Stocking"
                        });
                        update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                            _GrantStatus: "Submitted"
                        });
                        update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                            _DateSubmitted: today
                        });
                        update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                            _TimeSubmitted: time
                        });

                        //Automatically set form lock state to "locked"
                        const stateOfLock = "locked";
                        update(ref(database, 'users/' + uid + '/forms/steve_stocking'), {
                            lockState: stateOfLock
                        });

                        // Validate file types
                        const allowedFileTypes = ['application/pdf'];

                        if (allowedFileTypes.includes(letterFile.type) && allowedFileTypes.includes(essayFile.type)) {
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
                        } else {
                            // Handle error: Invalid file format
                            document.getElementById('error-message').textContent = 'Please upload PDF files only.';
                            return;
                        }

                    }
                });
            } else {
                console.log("Not signed in");
            }
        })
    }
    return (
        <div className="wrapper-appform" id="appFormWrapper" onLoad="javascript:onAuthStateChanged(auth, auth.currentUser)">
            <div className="form-appform">
                <div className="grantTitle-appform">
                    <label for="title-appform" class="title-appform">Steve Stocking Youth Environmental Scholarship</label>
                </div>
                <div className="questionSection-appform">
                    <div className="q4-appform">
                        <label for="question4Text" class="form-label-appform4">In the text boxes below, please type your name, address, home phone, email, birth date (mm/dd/yy), and your city, state, and ZIP code.</label>
                        <div className="q4Wrapper-appform">
                            <div class="row g-3 row-appform">
                                <div class="col-md">
                                    <label for="fname">First Name</label>
                                    <input type="text" class="form-control" id="fname" placeholder="First Name" aria-label="First Name"></input>
                                </div>
                                <div class="col-md">
                                    <label for="lname">Last Name</label>
                                    <input type="text" class="form-control" id="lname" placeholder="Last Name" aria-label="Last Name"></input>
                                </div>
                            </div>
                            <div class="row g-3 row-appform">
                                <div class="col-md">
                                    <label for="birthday">Birth Date (mm/dd/yyyy)</label>
                                    <input type="text" class="form-control" id="birthday" placeholder="Birth Date (mm/dd/yyyy)" aria-label="Birth Date (mm/dd/yyyy)"></input>
                                </div>
                                <div class="col-md">
                                    <label for="email">Email</label>
                                    <input type="text" class="form-control" id="email" placeholder="Email" aria-label="Email"></input>
                                </div>
                                <div class="col-md">
                                    <label for="homephone">Home Phone</label>
                                    <input type="text" class="form-control" id="phone" placeholder="Home Phone" aria-label="Home Phone"></input>
                                </div>
                            </div>
                            <div class="row g-3 row-appform">
                                <div class="col-md">
                                    <label for="address">Address</label>
                                    <input type="text" class="form-control" id="address" placeholder="Address" aria-label="Address"></input>
                                </div>
                                <div class="col-md">
                                    <label for="city">City</label>
                                    <input type="text" class="form-control" id="city" placeholder="City" aria-label="City"></input>
                                </div>
                                <div class="col-md">
                                    <label for="state">State</label>
                                    <input type="text" class="form-control" id="state" placeholder="State" aria-label="State"></input>
                                </div>
                                <div class="col-md">
                                    <label for="zip">ZIP Code</label>
                                    <input type="text" class="form-control" id="zip" placeholder="ZIP Code" aria-label="ZIP Code"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="q1-appform">
                        <label for="question1Text" class="form-label-appform1">Are you, or a parent or guardian, a member of the San Joaquin Audubon Society?</label>
                        <div className="Q1Selection-appform">
                            <select className="q1select-appform" id="q1">
                                <option value="Select">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="q2-appform">
                        <label for="question2Text" class="form-label-appform2">Do you live in San Joaquin County?</label>
                        <div className="Q2Selection-appform">
                            <select className="q2select-appform" id="q2">
                                <option value="Select">Select</option>
                                <option value="Yes">Yes</option>
                                <option value="No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className="q3-appform">
                        <label for="question3Text" class="form-label-appform3">Which camp or program do you want to attend?</label>
                        <textarea type="answer" class="form-control" id="q3" aria-describedby="answerHelp" rows="1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className="qLast-appform">
                        <label for="qLastText" class="form-label-appformLast">Do you have any feedback or additional comments to make?</label>
                        <textarea type="answer" class="form-control" id="q4" aria-describedby="answerHelp" rows="1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className="q5-appform">
                        <label for="question5Text" class="form-label-appform5">Please submit a letter of recommendation from a teacher, parent, or adult friend that should cover what they know about your interest in learning about the environment, nature, or birds. Please use the button below and submit in PDF only.</label>
                    </div>
                    <div className="uploadButtonLetterOfRec-appform">
                        <input type="file" id="letterFile" name="letter"></input>
                    </div>
                    <div className="q6-appform">
                        <label for="question6Text" class="form-label-appform6">Please also submit a personal essay that states the importance of attending an environmental, nature, or birding camp or program to you. The essay should not be more than 2 pages long. Do you try to teach others about nature or birds? Do you draw trees, plants, birds, or other animals in nature you see? We want to know about your interest in the environment and nature. Please use the button below and submit in PDF only.</label>
                    </div>
                    <div className="uploadButtonEssay-appform">
                        <input type="file" id="essayFile" name="essay"></input>
                    </div>
                    <div className="error-message" id="error-message">
                    </div>
                </div>
                <div className="buttonWrapper1-appform">
                    <div class="text-center">
                        <button type="submit" className="btn btn-lr btn-success submitbutton-appform" onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
                <div className="buttonWrapper2-appform" >
                    <div class="text-center">
                        <Link className="prev-page-link" onClick={handleGrantClick}><button class="button2-appform">Return to Previous Page</button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
