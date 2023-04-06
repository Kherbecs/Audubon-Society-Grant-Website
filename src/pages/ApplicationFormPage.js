import React from 'react'
import '../css/ApplicationFormPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function ApplicationFormPage() {
    return (
        <div className = "wrapper-appform">
            <div className = "form-appform">
                <div className = "grantTitle-appform">
                    <label for = "title-appform" class = "title-appform">Generic Grant Title</label>
                </div>
                <div className = "questionSection-appform">
                    <div className = "q1-appform">
                        <label for="question1Text" class="form-label-appform">This is question 1.</label>
                        <textarea type="answer" class="form-control" id="inputAnswer1" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "q2-appform">
                        <label for="question2Text" class="form-label-appform">This is question 2.</label>
                        <textarea type="answer" class="form-control" id="inputAnswer2" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "q3-appform">
                        <label for="question3Text" class="form-label-appform">This is question 3.</label>
                        <textarea type="answer" class="form-control" id="inputAnswer3" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "q4-appform">
                        <label for="question4Text" class="form-label-appform">This is question 4.</label>
                        <textarea type="answer" class="form-control" id="inputAnswer4" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "qLast-appform">
                        <label for="qLastText" class="form-label-appform">Do you have any feedback for us?</label>
                        <textarea type="answer" class="form-control" id="inputAnswerLast" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "uploadButtonLetterOfRec-appform">
                        <div className = "uploadButtonTextDiv-appform">
                            <label for = "uploadButtonLetterText-appform" id = "form-label-appform">Please use the button below to submit your letter of recommendation.</label>
                        </div>
                        <input type = "file" id = "letterFile" name = "letter"></input>
                    </div>
                    <div className = "uploadButtonEssay-appform">
                        <div className = "uploadButtonTextDiv-appform">
                            <label for = "uploadButtonLetterText-appform" id = "form-label-appform">Please use the button below to submit your essay.</label>
                        </div>
                        <input type = "file" id = "essayFile" name = "essay"></input>
                    </div>
                </div>
                <div className = "buttonWrapper1-appform">
                    <div class="text-center">
                        <button class = "button1-appform">Submit</button>
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