import {React, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/GrantSelection.css'
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export function GrantSelection(){
    const history = useHistory();

    const handleApplicationClick = () => {
      history.push('/applicationformpage');
      window.location.reload();
    };

    return(
        
        <div className="GrantSelection">

            <div className="GrantScholarshipHeader" header>
                <h1>Grants and Scholarships</h1>
            </div>       
            
            <div className="GrantScholarshipCard" card>    
                
                <div className="TopPhoto">
                    <img className="img_1"src="http://www.sanjoaquinaudubon.org/wp-content/uploads/2022/03/WaldoHoltPic1.jpg" alt="Card cap"></img>
                </div>  
                    <div className= "GrantHeader" card-header>
                        <h3>Environmental Education and Conservation</h3>
                        <hr></hr>
                    </div>
                    <div className="BottomHalf" card-body>
                        <text className="GrantScholarshipInfo">
                            To preserve birds and ecosystems for future generations in San Joaquin County, we must be
                            willing to work toward a better future. That is why San Joaquin Audubon Society (SJAS) provides
                            grant funds for organizations working to conserve our local environment. We encourage
                            groups to apply that are interested in birding and environmental conservation, restoration, and
                            education. Grants are funded for projects located within San Joaquin County. <br></br>
                            Grant funding cannot exceed $1500.00 per applicant.
                        </text>
                        <div className="ApplyButton" container>
                            <text><Link class="btn btn-success btn-lg apply_1" onClick={handleApplicationClick}>Apply</Link></text>            
                        </div>
                        <p className= "ApplicationSub"><small>
                            Applications should be submitted by February 15, 2024<br></br>
                            Applicants will be informed of decisions no later than February 20, 2024
                          </small></p>
                    <div className="DropDowns" accordion id="dropdowns">
                            <div className="DropDownItem" accordion-item>
                                <h2 class="accordion-header" id="panelsStayOpen-dropdown1">
                                    <hr></hr>
                                    <button className="ExampleButton" class= "btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#dropdown1-body" 
                                    aria-expanded="false" aria-controls="dropdown1-body">    
                                        <b>Examples of projects eligible for the grant</b>
                                    </button>
                                    <hr></hr>
                                </h2>
                                <div id="dropdown1-body" class="accordion-collapse collapse" aria-labelledby="panelsStayOpen-dropdown1">
                                    
                                        <div className="ExampleBox" accordion-body>
                                            <a className="Scholarship-example" class="btn btn-outline-success btn-sm" href="https://www.sanjoaquinaudubon.org/" target="blank">
                                                Example 1</a>
                                            <a className="Scholarship-example" class="btn btn-outline-success btn-sm" href="https://www.sanjoaquinaudubon.org/" target="blank">
                                                Example 2</a>
                                            <a className="Scholarship-example" class="btn btn-outline-success btn-sm" href="https://www.sanjoaquinaudubon.org/" target="blank">
                                                Example 3</a>
                                            <a className="Scholarship-example" class="btn btn-outline-success btn-sm" href="https://www.sanjoaquinaudubon.org/" target="blank">
                                                Example 4</a>
                                        </div>
                                        <hr></hr>
                                </div>
                            </div>

                            <div className="DropDownItem" accordion-item>
                                <h2 class="accordion-header" id="dropdown2">
                    
                                    <button className="ScholarshipRequirementsButton" class= "btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#dropdown2-body" 
                                    aria-expanded="false" aria-controls="dropdown2-body">    
                                        <b>Grant Requirements</b>
                                    </button>
                                    <hr></hr>
                                </h2>
                                <div id="dropdown2-body" class="accordion-collapse collapse" aria-labelledby="dropdown2">
                                        
                                        <div className="ExampleBox" accordion-body>
                                            <text className="Requirements"> Organization Information <b>|</b> Project Description <b>|</b> Amount Requested 
                                            </text>
                                         
                                        </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            
            <div className="GrantScholarshipCard" card>
                <div className="TopPhoto_2">
                    <img className= "img_2" 
                        src="https://www.sanjoaquinaudubon.org/wp-content/uploads/2019/12/1.png" 
                        alt="BlueBird"
                        ></img>
                </div>  

                <div className="ScholarshipHeader" card-header>
                    <h3>Steve Stocking Youth Environmental Scholarship</h3>
                    <hr></hr>
                </div>
                <div className="BottomHalf" card-body>
                        <div className="GrantScholarshipInfo" class="card-body">
                        For all camps, the scholarship will pay for the cost of the registration for the youth participant.
                        Transportation will be the responsibility of the participant. 
                        To be considered, you must be a member (or parent or guardian is a member) of the San Joaquin Audubon Society, 
                        live in San Joaquin County, and have a camp or program you want to attend.
                        </div>
                    <div className="ApplyButton" container>
                        <text><Link class="btn btn-success btn-lg apply_2" onClick={handleApplicationClick}>Apply</Link></text>            
                    </div>
                    <p className= "ApplicationSub"><small>
                        Applications should be submitted by February 15, 2024<br></br>
                        Applicants will be informed of decisions no later than February 20, 2024
                        </small>
                    </p>



                        <div className="DropDowns" accordion id="Scholarship-dropdowns">
                            <div className="DropDownItem" accordion-item>
                                <h2 class="accordion-header" id="Scholarship-dropdown1">
                                    <hr></hr>
                                    <button className="ExampleButton" class= "btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#Scholarship-dropdown1-body" 
                                    aria-expanded="false" aria-controls="Scholarship-dropdown1-body">    
                                        <b>Examples of the camp experiences eligible for the scholarship</b>
                                    </button>
                                    <hr></hr>
                                </h2>
                                <div id="Scholarship-dropdown1-body" class="accordion-collapse collapse" aria-labelledby="Scholarship-dropdown1">
                                    
                                        <div className="ExampleBox" accordion-body>
                                            <a className="Scholarship-example" class="btn btn-outline-success btn-sm" href="https://hogisland.audubon.org/programs/mountains-sea-birding-teens" target="blank">
                                                Hog Island Audubon Camp</a>
                                        <a className="Scholarship-example" class="btn btn-outline-success btn-sm" href="https://wolf-ridge.org/event/ornithology-field-camp/" target="blank">
                                            Wolf Ridge Environmental Learn Center</a>
                                        <a className="Scholarship-example" class="btn btn-outline-success btn-sm" href="https://www.birdconservancy.org/what-we-do/education/colorado-programs/birdcamps/overnightcamps/" target="blank">
                                            Bird Conservancy of the Rockies</a>
                                        <a className="Scholarship-example" class="btn btn-outline-success btn-sm" href="https://www.aba.org/camps/" target="blank">
                                            ABA Youth Birding Camps</a>
                                        
                                        </div>
                                        <hr></hr>
                                </div>
                            </div>

                            <div className="DropDownItem" accordion-item>
                                <h2 class="accordion-header" id="Scholarship-dropdown2">
                    
                                    <button className="ScholarshipRequirementsButton" class= "btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#Scholarship-dropdown2-body" 
                                    aria-expanded="false" aria-controls="Scholarship-dropdown2-body">    
                                        <b>Scholarship Requirements</b>
                                    </button>
                                    <hr></hr>
                                </h2>
                                <div id="Scholarship-dropdown2-body" class="accordion-collapse collapse" aria-labelledby="Scholarship-dropdown2">
                                        
                                        <div className="ExampleBox" accordion-body>
                                            <text className="Requirements">Letter of recommendation <b>|</b> Personal essay <b>|</b> Application form
                                            </text>

                                         
                                        </div>
                                    
                                </div>
                            </div>

                        </div>


                        
                    </div>

                    
            </div>  

        </div>
    );

}