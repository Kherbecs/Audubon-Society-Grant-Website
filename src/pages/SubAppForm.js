import React from 'react'
import '../css/SubAppForm.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function SubAppForm() {
    return (
        <div className = "wrapper-subappform">
            <div className = "form-subappform">
                <div className = "grantTitle-subappform">
                    <label for = "title-subappform" class = "title-subappform">Steve Stocking Youth Environmental Scholarship</label>
                </div>
                <div className = "questionSection-subappform">
                    <div className = "basicInfo-subappform">
                        <label for="basicInfoText" class="form-label-subappform1">In the text boxes below, please type your name, address, home phone, email, birth date (mm/dd/yy), and your city, state, and ZIP code.</label>
                        <div className = "basicInfoWrapper-subappform">
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label for = "fname">First Name</label>
                                    <input type = "text" value = "John" class = "form-control user-info-field" placeholder = "First Name" aria-label= "First Name" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "lname">Last Name</label>
                                    <input type = "text" value = "Smith" class = "form-control user-info-field" placeholder = "Last Name" aria-label= "Last Name" readOnly></input>
                                </div>
                            </div>
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label for = "birthday">Birth Date (mm/dd/yy)</label>
                                    <input type = "text" value = "04/19/1993" class = "form-control user-info-field" placeholder = "Birth Date (mm/dd/yy)" aria-label = "Birth Date (mm/dd/yy)" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "email">Email</label>
                                    <input type = "text" value = "JohnSmith@gmail.com" class = "form-control user-info-field" placeholder = "Email" aria-label = "Email" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "homephone">Home Phone</label>
                                    <input type = "text" value = "(916) 501-7088" class = "form-control user-info-field" placeholder = "Home Phone" aria-label = "Home Phone" readOnly></input>
                                </div>
                            </div>
                            <div class = "row g-3 row-appform">
                                <div class = "col-md">
                                    <label for = "address">Address</label>
                                    <input type = "text" value = "6801 Shiner Street" class = "form-control user-info-field" placeholder = "Address" aria-label = "Address" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "city">City</label>
                                    <input type = "text" value = "Sacramento" class = "form-control user-info-field" placeholder = "City" aria-label = "City" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "state">State</label>
                                    <input type = "text" value = "CA" class = "form-control user-info-field" placeholder = "State" aria-label = "State" readOnly></input>
                                </div>
                                <div class = "col-md">
                                    <label for = "zip">ZIP Code</label>
                                    <input type = "text" value = "95828" class = "form-control user-info-field" placeholder = "ZIP Code" aria-label = "ZIP Code" readOnly></input>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className = "q1-subappform">
                        <label for="question1Text" class="form-label-subappform2">Are you, or a parent or guardian, a member of the San Joaquin Audubon Society?</label>
                        <div className = "Q1Selection-subappform">
                            <select className = "q1select-subappform" id = "q1select-subappform" disabled>
                                <option value = "Yes">Yes</option>
                            </select>
                        </div>
                    </div>
                    <div className = "q2-subappform">
                        <label for="question2Text" class="form-label-subappform2">Do you live in San Joaquin County?</label>
                        <div className = "Q1Selection-subappform">
                            <select className = "q2select-subappform" id = "q1select-subappform" disabled>
                                <option value = "No">No</option>
                            </select>
                        </div>                        
                    </div>
                    <div className = "q3-subappform">
                        <label for="question3Text" class="form-label-subappform2">Which camp or program do you want to attend?</label>
                        <div class="wrapper-user-answer">
                            <textarea class="form-control" id="textAreaExample" rows="4" 
                                value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam eleifend mi in nulla posuere sollicitudin." readOnly>
                            </textarea>
                        </div>                         
                    </div>
                    <div className = "q4-subappform">
                        <label for="question4Text" class="form-label-subappform2">Do you have any feedback for us?</label>
                        <div class="wrapper-user-answer">
                        <textarea class="form-control" id="textAreaExample" rows="4" 
                            value = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porttitor eget dolor morbi non arcu risus quis. Enim praesent elementum facilisis leo vel. Ultricies leo integer malesuada nunc vel." readOnly>
                        </textarea>       
                        </div> 
                    </div>
                    <div className = "q5-subappform">
                        <label for="question5Text" class="form-label-appform5">Please submit a letter of recommendation from a teacher, parent, or adult friend that should cover what they know about your interest in learning about the environment, nature, or birds.</label>
                    </div>
                    <div className = "uploadButtonLetterOfRec-subappform">
                        <div className = "uploadButtonTextDiv-subappform">
                            <label for = "uploadButtonLetterText-subappform" id = "form-label">SAMPLE_LETTER_OF_REC.pdf</label>
                        </div>
                    </div>
                    <div className = "q6-subappform">
                        <label for="question6Text" class="form-label-appform6">Please also submit a personal essay that states the importance of attending an environmental, nature, or birding camp or program to you. The essay should not be more than 2 pages long. Do you try to teach others about nature or birds? Do you draw trees, plants, birds, or other animals in nature you see? We want to know about your interest in the environment and nature.</label>
                    </div>
                    <div className = "uploadButtonEssay-subappform">
                        <div className = "uploadButtonTextDiv-subappform">
                            <label for = "uploadButtonLetterText-subappform" id = "form-label">SAMPLE_ESSAY.pdf</label>
                        </div>
                    </div>
                </div>
                <div className = "buttonWrapper1-subappform" >
                    <div class="text-center-subappform">
                        <a href = "/pastsubmissions"><button class = "button1-subappform">Return to Past Submissions</button></a>
                    </div>
                </div>
            </div>
        </div>
    )
}