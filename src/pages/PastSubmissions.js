import React from "react";
import '../css/PastSubmissions.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export function PastSubmissions() {
    return (
        <div class="flex-wrap page-content">
            <div class="col">
                <a class="btn btn-nav btn-sm btn-success back-to-grants" href="/grantselection">Back to Grants</a>
            </div>

            <div class="mx-auto text-center page-title">
                <h1 class="past-submissions-title">Past Submissions</h1>
            </div>

            <div class="container container-content">
                <div class="col-8 card submission-body">
                    
                    <div class="hstack application-headers p-3">
                            <h4>Applications</h4>
                            <h4>Status</h4>
                    </div>

                    <div class="card-body row main-card desktop-apps">
                        <div class="vstack col-6">
                            <a href="/subappform" class="btn btn-success m-2 applications" role="button">Bird Watching Grant</a>
                            <a href="#link" class="btn btn-success m-2 applications" role="button">Bird Watching Grant 2</a>
                            <a href="#link" class="btn btn-success m-2 applications" role="button">Test</a>
                            <a href="#link" class="btn btn-success m-2 applications" role="button">Environmental Education and Conservation Youth Scholarship and Birding Summer Camp</a>
                        </div>

                        <div class="vstack col-4">
                            <div class="btn btn m-2 disabled app-status">Review in Progress</div>
                            <div class="btn m-2 disabled app-status">Review in Progress</div>
                            <div class="btn m-2 disabled app-status">Review in Progress</div>
                            <div class="btn m-2 disabled app-status">Review in Progress</div>
                        </div>
                    </div>

                    <div class="card-body row main-card mx-auto mobile-apps btn-toolbar">
                        <div class="vstack col-6">
                            <a href="#link" class="btn btn-success m-6 applications" role="button">Bird Watching Grant</a>
                            <div class="btn btn m-2 disabled app-status mb-5">Review in Progress</div>
                            <a href="#link" class="btn btn-success m-6 applications" role="button">Bird Watching Grant 2</a>
                            <div class="btn btn m-2 disabled app-status mb-5">Review in Progress</div>
                            <a href="#link" class="btn btn-success m-6 applications" role="button">Test</a>
                            <div class="btn btn m-2 disabled app-status mb-5">Review in Progress</div>
                            <a href="#link" class="btn btn-success m-6 applications" role="button">Environmental Education and Conservation Youth Scholarship and Birding Summer Camp</a>
                            <div class="btn btn m-2 disabled app-status mb-5">Review in Progress</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}