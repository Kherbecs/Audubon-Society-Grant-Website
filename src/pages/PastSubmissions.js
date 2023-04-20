import React from "react";
import '../css/PastSubmissions.css';
import 'bootstrap/dist/css/bootstrap.min.css'

export function PastSubmissions() {
    return (
        <div class="flex-wrap page-content">
            <div class="col">
                <a class="btn btn-nav btn-sm btn-success back-to-grants" href="/grantselection">Back</a>
            </div>

            <div class="mx-auto text-center page-title">
                <h1 class="past-submissions-title">Past Submissions</h1>
            </div>

            <div class="container-fluid container-content">
                <div class="col-8 card submission-body">
                    <div class="card-body row main-card desktop-apps">
                        <div class="vstack col-xl-6 col-lg-5 col-md-5 col-sm-6 applications-stack">
                            <h4>Applications</h4>
                            <hr className="hr-past-submissions"/>
                            <a href="/subappform" class="btn btn-success m-2 applications" role="button">Bird Watching Grant</a>
                            <a href="#link" class="btn btn-success m-2 applications" role="button">Bird Watching Grant 2</a>
                            <a href="#link" class="btn btn-success m-2 applications" role="button">Test</a>
                            <a href="#link" class="btn btn-success m-2 applications" role="button">Environmental Education and Conservation Youth Scholarship and Birding Summer Camp</a>
                        </div>

                        <div class="vstack col-xl-4 col-lg-4 col-md-4 col-sm-3  status-stack">
                            <h4 class="mobile-hide">Status</h4>
                            <hr className="hr-past-submissions mobile-hide"/>
                            <div class="btn btn m-2 order-2 disabled app-status">Review in Progress</div>
                            <div class="btn m-2 disabled app-status">Review in Progress</div>
                            <div class="btn m-2 disabled app-status">Review in Progress</div>
                            <div class="btn m-2 disabled app-status">Review in Progress</div>
                        </div>
        
                        <div class="vstack col-xl-2 col-lg-3 col-md-3 col-sm-3 date-submitted-stack">
                            <h4 class="mobile-hide">Submitted</h4>
                            <hr className="hr-past-submissions mobile-hide"/>
                            <div class="p-1 m-2 disabled date-submitted">4/17/23</div>
                            <div class="p-1 m-2 disabled date-submitted">4/17/23</div>
                            <div class="p-1 m-2 disabled date-submitted">9/31/23</div>
                            <div class="p-1 m-2 disabled date-submitted">6/7/23</div>
                        </div>
                    </div>

                    <div class="container-fluid card-body row main-card mx-auto mobile-apps btn-toolbar">
                        <div class="row justify-content-center">
                            <h4>Applications</h4>
                            <hr className="mobile-applications-hr"/>
                            <a href="/subappform" class="btn btn-success m-6 applications col-md-12" role="button">Bird Watching Grant</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 4/17/23</div>
                            <hr className="mobile-applications-hr"/>
                            
                            <a href="#link" class="btn btn-success m-6 applications" role="button">Bird Watching Grant 2</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 4/17/23</div>
                            <hr className="mobile-applications-hr"/>

                            <a href="#link" class="btn btn-success m-6 applications" role="button">Test</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 9/31/23</div>
                            <hr className="mobile-applications-hr"/>

                            <a href="#link" class="btn btn-success m-6 applications" role="button">Environmental Education and Conservation Youth Scholarship and Birding Summer Camp</a>
                            <div class="btn btn m-2 disabled app-status col-md-4 col-sm-4 mobile-progress">Review in Progress</div>
                            <div class="m-2 disabled app-status col-md-4 col-sm-4 date-submitted">Submitted 6/7/23</div>
                            <hr className="mobile-applications-hr"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}