import React from 'react'
import '../css/SubAppForm.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function SubAppForm() {
    return (
        <div className = "wrapper-subappform">
            <div className = "form-subappform">
                <div className = "grantTitle-subappform">
                    <label for = "title-subappform" class = "title-subappform">Generic Grant Title</label>
                </div>
                <div className = "questionSection-subappform">
                    <div className = "q1-subappform">
                        <label for="qText" class="form-label-subappform">This is question 1.</label>
                        <div className = "answerarea-subappform">
                            <p className = "qanswer-subappform">This is the answer to question 1.</p>
                        </div>
                    </div>
                    <div className = "q2-subappform">
                        <label for="qText" class="form-label-subappform">This is question 2.</label>
                        <div className = "answerarea-subappform">
                            <p className = "qanswer-subappform">This is the answer to question 2. This specific answer is longer to see what more text would look like.</p>
                        </div>
                    </div>
                    <div className = "q3-subappform">
                        <label for="qText" class="form-label-subappform">This is question 3.</label>
                        <div className = "answerarea-subappform">
                            <p className = "qanswer-subappform">This is the answer to question 3. This specific answer is much longer to see what more text would look like.
                            This answer is even longer so that we can see what multiple lines would look like.</p>
                        </div>
                    </div>
                    <div className = "q4-subappform">
                        <label for="qText" class="form-label-subappform">This is question 4.</label>
                        <div className = "answerarea-subappform">
                            <p className = "qanswer-subappform">This is the answer to question 4. Lorem ipsum dolor sit amet, 
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        </div>
                    </div>
                    <div className = "qLast-subappform">
                        <label for="qTextText" class="form-label-subappform">Do you have any feedback for us?</label>
                        <div className = "answerarea-subappform"> 
                            <p className = "qanswer-subappform">This is the feedback.</p>
                        </div>
                    </div>
                    <div className = "uploadButtonLetterOfRec-subappform">
                        <div className = "uploadButtonTextDiv-subappform">
                            <label for = "uploadButtonLetterText-subappform" id = "form-label">SAMPLE_LETTER_OF_REC.pdf</label>
                        </div>
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