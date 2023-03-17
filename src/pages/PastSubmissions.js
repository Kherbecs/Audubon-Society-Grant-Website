import React from "react";
import '../css/PastSubmissions.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export function PastSubmissions() {
    return (
        <div class="flex-wrap">
            <div class="col">
                <a class="btn btn-nav btn-sm btn-success back-to-grants" href="/grantselection">Back to Grants</a>
            </div>
            
            <div class="mx-auto text-center page-title">
                <div class="row">
                    <div class="container">
                        <h1>Past Submissions</h1>
                    </div>
                </div>
            </div>

            <div class="container">
                <div class="col-8 card submission-body">
                    <div class="hstack application-headers p-3">
                            <h4>Applications</h4>
                            <h4>Status</h4>
                    </div>
                    <div class="card-body row main-card">
                    <div class="vstack col-6">
                            <button class="btn btn-success m-2 applications">Bird Watching Grant</button>
                            <button class="btn btn-success m-2 applications">Bird Watching Grant 2</button>
                            <button class="btn btn-success m-2 applications">Test</button>
                            <button class="btn btn-success m-2 applications">Environmental Education and Conservation Youth Scholarship and Birding Summer Camp </button>
                        </div>

                        <div class="vstack col-4 application-status">
                            <div class="btn btn m-2 disabled">Review in Progress</div>
                            <div class="btn m-2 disabled">Review in Progress</div>
                            <div class="btn m-2 disabled">Review in Progress</div>
                            <div class="btn m-2 disabled">Review in Progress</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
