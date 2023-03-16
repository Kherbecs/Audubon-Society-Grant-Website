import React from 'react'
import '../css/ApplicationFormPage.css'
import '../bootstrap/css/bootstrap.min.css'

export function ApplicationFormPage() {
    return (
        <div className = "wrapper">
            <div className = "form">
                <div className = "grantTitle">
                    <label for = "title" class = "title">Generic Grant Title</label>
                </div>
                <div className = "questionSection">
                    <div className = "q1">
                        <label for="question1Text" class="form-label">This is question 1.</label>
                        <textarea type="answer" class="form-control" id="inputAnswer1" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "q2">
                        <label for="question2Text" class="form-label">This is question 2.</label>
                        <textarea type="answer" class="form-control" id="inputAnswer2" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "q3">
                        <label for="question3Text" class="form-label">This is question 3.</label>
                        <textarea type="answer" class="form-control" id="inputAnswer3" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "q4">
                        <label for="question4Text" class="form-label">This is question 4.</label>
                        <textarea type="answer" class="form-control" id="inputAnswer4" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                    <div className = "qLast">
                        <label for="qLastText" class="form-label">Do you have any feedback for us?</label>
                        <textarea type="answer" class="form-control" id="inputAnswerLast" aria-describedby="answerHelp" rows = "1"></textarea>
                        <div id="questionHelp" class="form-text">Please type your answer in the box above.</div>
                    </div>
                </div>
                <div className = "buttonWrapper1">
                    <div class="text-center">
                        <button class = "button1">Submit</button>
                    </div>
                </div>
                <div className = "buttonWrapper2" >
                    <div class="text-center">
                        <button class = "button2">Return to Previous Page</button>
                    </div>
                </div>
            </div>
        </div>
    )
}