import React from 'react'
import '../css/AdminSubAppForm.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function AdminSubAppForm() {
    return (
        <div className = "wrapper-appform">
            <div className = "form-appform">
                <div className = "back-button" >
                    <a class="prev-page-link" href="/adminportal"><button class = "button2">Return to Previous Page</button></a>
                </div>
                <div className = "grantTitle">
                    <label for = "title" class = "title">Steve Stocking Youth Environmental Scholarship</label>
                </div>
                <div className = "questionSection">
                <div className = "question">
                        <label for="question4Text" class="question-label">In the text boxes below, please type your name, address, home phone, email, birth date (mm/dd/yy), and your city, state, and ZIP code.</label>
                        <div className = "q4Wrapper-appform">
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label class="user-info-label" for = "fname">First Name</label>
                                    <input type = "text" value = "John" class = "form-control user-info-field" placeholder = "First Name" aria-label= "First Name" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label class="user-info-label" for = "lname">Last Name</label>
                                    <input type = "text" value = "Smith" class = "form-control user-info-field" placeholder = "Last Name" aria-label= "Last Name" readOnly></input>
                                </div>
                            </div>
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label class="user-info-label" for = "birthday">Birth Date (mm/dd/yy)</label>
                                    <input type = "text" value = "04/19/1993" class = "form-control user-info-field" placeholder = "Birth Date (mm/dd/yy)" aria-label = "Birth Date (mm/dd/yy)" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label class="user-info-label" for = "email">Email</label>
                                    <input type = "text" value = "JohnSmith@gmail.com" class = "form-control user-info-field" placeholder = "Email" aria-label = "Email" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label class="user-info-label" for = "homephone">Home Phone</label>
                                    <input type = "text" value = "(916) 501-7088" class = "form-control user-info-field" placeholder = "Home Phone" aria-label = "Home Phone" readOnly></input>
                                </div>
                            </div>
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label class="user-info-label" for = "address">Address</label>
                                    <input type = "text" value = "6801 Shiner Street" class = "form-control user-info-field" placeholder = "Address" aria-label = "Address" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label class="user-info-label" for = "city">City</label>
                                    <input type = "text" value = "Sacramento" class = "form-control user-info-field" placeholder = "City" aria-label = "City" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label class="user-info-label" for = "state">State</label>
                                    <input type = "text" value = "CA" class = "form-control user-info-field" placeholder = "State" aria-label = "State" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label class="user-info-label" for = "zip">ZIP Code</label>
                                    <input type = "text" value = "95828" class = "form-control user-info-field" placeholder = "ZIP Code" aria-label = "ZIP Code" readOnly></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "question">
                        <label for="question1Text" class="question-label">Are you, or a parent or guardian, a member of the San Joaquin Audubon Society?</label>
                        <div className = "Q1Selection-appform">
                            <select className = "q1select-appform" id = "q1select-appform" disabled>
                                <option value = "Yes">Yes</option>
                            </select>
                        </div>                      
                    </div>
                    <div className = "question">
                        <label for="question2Text" class="question-label">Do you live in San Joaquin County?</label>
                        <div className = "Q2Selection-appform">
                            <select className = "q2select-appform" id = "q1select-appform" disabled>
                                <option value = "No">No</option>
                            </select>
                        </div>                        
                    </div>
                    <div className = "question">
                        <label for="question3Text" class="question-label">Which camp or program do you want to attend?</label>
                        <div class="wrapper-user-answer">
                            <textarea class="form-control" id="textAreaExample" rows="4" 
                                value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam eleifend mi in nulla posuere sollicitudin." readOnly>
                            </textarea>
                        </div>                         
                    </div>
                    
                    <div className = "question">
                        <label for="qLastText" class="question-label">Do you have any feedback for us?</label>
                        <div class="wrapper-user-answer">
                        <textarea class="form-control" id="textAreaExample" rows="4" 
                            value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor eget dolor morbi non arcu risus quis. Enim praesent elementum facilisis leo vel. Ultricies leo integer malesuada nunc vel." readOnly>
                        </textarea>       
                        </div> 
                    </div>
                </div>
                <div class="file-div">
                    <p><a href="#">user_letter_of_rec.pdf</a></p>
                    <p><a href="#">user_essay.pdf</a></p>
                </div>
                <div class="wrapper-admin-feedback">
                    <div class="wrapper-new-comment">
                        <div class="admin-comments">
                            <textarea type="answer" class="form-control admin-comment-box" id="inputAnswer1" aria-describedby="answerHelp" rows = "4"></textarea>
                        </div>
                        <div class="wrapper-feedback-buttons"> 
                            <div class="wrapper-comment-button">
                                <button class="add-comment-button">Add Comment</button>
                            </div>
                            <div class="wrapper-small-feedback-buttons">
                                <div class="wrapper-status-button">
                                    <select class="form-select" id="floatingSelect" aria-label="Filter drop down menu">
                                        <option selected>Status</option>
                                        <option value="grant">Under Review</option>
                                        <option value="grant">Approved</option>
                                    </select>
                                </div>
                                <div class="wrapper-grade-button">
                                <select class="form-select" id="floatingSelect" aria-label="Filter drop down menu">
                                        <option selected>Grade</option>
                                        <option value="grant">1</option>
                                        <option value="grant">2</option>
                                        <option value="grant">3</option>
                                        <option value="grant">4</option>
                                        <option value="grant">5</option>
                                        <option value="grant">6</option>
                                        <option value="grant">7</option>
                                        <option value="grant">8</option>
                                        <option value="grant">9</option>
                                        <option value="grant">10</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="wrapper-previous-comments">
                        <div class="comment">
                            <p><strong>Robert Left a Comment: </strong>
                                John did a great job with questions 1-3 but left a little to be desired on question 4. 
                                Feedback noted!
                            </p>
                        </div>
                        <div class="comment">
                            <p><strong>Alex Left a Comment: </strong>
                                John did a decent job with questions 1-2 but did amazing on question 4. 
                            </p>
                        </div>
                        <div class="comment">
                            <p><strong>Jose Left a Comment: </strong>
                                John did a decent job with questions 1-2 but did bad on question 4. 
                            </p>
                        </div>
                        <div class="comment">
                            <p><strong>Sarah Left a Comment: </strong>
                                John did an amazing job! 
                            </p>
                        </div>
                        <div class="comment">
                            <p><strong>Larry Left a Comment: </strong>
                                John did great on his application. 
                            </p>
                        </div>
                        <div class="comment">
                            <p><strong>Tracy Left a Comment: </strong>
                                I think John did terrible
                            </p>
                        </div>
                    </div>
                </div>
                <div class="back-button">
                    <a class="prev-page-link" href="/adminportal"><button class = "button2">Return to Previous Page</button></a>
                </div>
            </div>
        </div>
    )
}