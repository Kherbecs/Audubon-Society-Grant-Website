import React from 'react'
import '../css/AdminSubAppForm.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function AdminSubAppForm() {
    return (
        <div className = "wrapper-appform">
            <div className = "form-appform">
                <div className = "grantTitle">
                    <label for = "title" class = "title">Generic Grant Title</label>
                </div>
                <div class="wrapper-user-information">
                    <div class="user-information-text">
                        <p><strong>Applicant Name:</strong> John Smith</p>
                        <p><strong>Email:</strong> johnsmith@gmail.com</p>
                    </div>
                </div>
                <div className = "questionSection">
                    <div className = "question">
                        <label for="question1Text" class="form-label">This is question 1.</label>
                        <div class="wrapper-user-answer">
                            <div class="user-answer-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor. 
                                    Viverra orci sagittis eu volutpat odio facilisis mauris sit amet. 
                                    Cursus risus at ultrices mi tempus. 
                                    Ipsum nunc aliquet bibendum enim facilisis gravida neque convallis a. 
                                    Ac feugiat sed lectus vestibulum mattis.
                                </p>
                            </div>
                        </div>                       
                    </div>
                    <div className = "question">
                        <label for="question2Text" class="form-label">This is question 2.</label>
                        <div class="wrapper-user-answer">
                            <div class="user-answer-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Ut tellus elementum sagittis vitae et leo duis ut.
                                </p>
                            </div>
                        </div>                        
                    </div>
                    <div className = "question">
                        <label for="question3Text" class="form-label">This is question 3.</label>
                        <div class="wrapper-user-answer">
                            <div class="user-answer-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Aliquam eleifend mi in nulla posuere sollicitudin.
                                </p>
                            </div>
                        </div>                         
                    </div>
                    <div className = "question">
                        <label for="question4Text" class="form-label">This is question 4.</label>
                        <div class="wrapper-user-answer">
                            <div class="user-answer-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div> 
                    </div>
                    <div className = "question">
                        <label for="qLastText" class="form-label">Do you have any feedback for us?</label>
                        <div class="wrapper-user-answer">
                            <div class="user-answer-text">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                                    Porttitor eget dolor morbi non arcu risus quis. 
                                    Enim praesent elementum facilisis leo vel. Ultricies leo integer malesuada nunc vel.
                                </p>
                            </div>
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
                <div className = "buttonWrapper2" >
                    <div class="text-center">
                        <button class = "button2"><a class="prev-page-link" href="/adminportal">Return to Previous Page</a></button>
                    </div>
                </div>
                <div class="back-button">
                    <button class = "button2"><a class="prev-page-link" href="/adminportal">Return to Previous Page</a></button>
                </div>
            </div>
        </div>
    )
}