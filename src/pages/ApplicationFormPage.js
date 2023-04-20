import React from 'react'
import '../css/ApplicationFormPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function ApplicationFormPage() {
    return (
        <div className = "wrapper-appform">
            <div className = "form-appform">
                <div className = "grantTitle-appform">
                    <label for = "title-appform" class = "title-appform">Steve Stocking Youth Environmental Scholarship</label>
                </div>
                <div className = "questionSection-appform">
                    <div className = "q4-appform">
                        <label for="question4Text" class="form-label-appform4">In the text boxes below, please type your name, address, home phone, email, birth date (mm/dd/yy), and your city, state, and ZIP code.</label>
                        <div className = "q4Wrapper-appform">
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label for = "fname">First Name</label>
                                    <input type = "text" class = "form-control" placeholder = "First Name" aria-label= "First Name"></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "lname">Last Name</label>
                                    <input type = "text" class = "form-control" placeholder = "Last Name" aria-label= "Last Name"></input>
                                </div>
                            </div>
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label for = "birthday">Birth Date (mm/dd/yy)</label>
                                    <input type = "text" class = "form-control" placeholder = "Birth Date (mm/dd/yy)" aria-label = "Birth Date (mm/dd/yy)"></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "email">Email</label>
                                    <input type = "text" class = "form-control" placeholder = "Email" aria-label = "Email"></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "homephone">Home Phone</label>
                                    <input type = "text" class = "form-control" placeholder = "Home Phone" aria-label = "Home Phone"></input>
                                </div>
                            </div>
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label for = "address">Address</label>
                                    <input type = "text" class = "form-control" placeholder = "Address" aria-label = "Address"></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "city">City</label>
                                    <input type = "text" class = "form-control" placeholder = "City" aria-label = "City"></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "state">State</label>
                                    <input type = "text" class = "form-control" placeholder = "State" aria-label = "State"></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "zip">ZIP Code</label>
                                    <input type = "text" class = "form-control" placeholder = "ZIP Code" aria-label = "ZIP Code"></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "q1-appform">
                        <label for="question1Text" class="form-label-appform1">Are you, or a parent or guardian, a member of the San Joaquin Audubon Society?</label>
                        <div className = "Q1Selection-appform">
                            <select className = "q1select-appform" id = "q1select-appform">
                                <option value = "Yes">Yes</option>
                                <option value = "No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className = "q2-appform">
                        <label for="question2Text" class="form-label-appform2">Do you live in San Joaquin County?</label>
                        <div className = "Q2Selection-appform">
                            <select className = "q2select-appform" id = "q1select-appform">
                                <option value = "Yes">Yes</option>
                                <option value = "No">No</option>
                            </select>
                        </div>
                    </div>
                    <div className = "q3-appform">
                        <label for="question3Text" class="form-label-appform3">Which camp or program do you want to attend?</label>
                        <textarea type="answer" class="form-control" id="inputAnswer3" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "qLast-appform">
                        <label for="qLastText" class="form-label-appformLast">Do you have any feedback or additional comments to make?</label>
                        <textarea type="answer" class="form-control" id="inputAnswerLast" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "q5-appform">
                        <label for="question5Text" class="form-label-appform5">Please submit a letter of recommendation from a teacher, parent, or adult friend that should cover what they know about your interest in learning about the environment, nature, or birds. Please use the button below.</label>
                    </div>
                    <div className = "uploadButtonLetterOfRec-appform">
                        <input type = "file" id = "letterFile" name = "letter"></input>
                    </div>
                    <div className = "q6-appform">
                        <label for="question6Text" class="form-label-appform6">Please also submit a personal essay that states the importance of attending an environmental, nature, or birding camp or program to you. The essay should not be more than 2 pages long. Do you try to teach others about nature or birds? Do you draw trees, plants, birds, or other animals in nature you see? We want to know about your interest in the environment and nature. Please use the button below.</label>
                    </div>
                    <div className = "uploadButtonEssay-appform">
                        <input type = "file" id = "essayFile" name = "essay"></input>
                    </div>
                </div>
                <div className = "buttonWrapper1-appform">
                    <div class="text-center">
                        <button type="submit" className="btn btn-lr btn-success submitbutton-appform">Submit</button>
                    </div>
                </div>
                <div className = "buttonWrapper2-appform" >
                    <div class="text-center">
                        <a href="/grantselection"><button class = "button2-appform">Return to Previous Page</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}