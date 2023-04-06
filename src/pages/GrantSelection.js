import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/GrantSelection.css'

export function GrantSelection(){
    return(
        
        <div className="GrantSelection">
            <div className="SubmissionsButton">
                    <text><a href="/pastsubmissions" className="SubmissionText" 
                    class="btn btn-dark">Submissions</a></text>
            </div>

            <div className="GrantScholarshipHeader" header>
                <h1>Grants and Scholarships</h1>
            </div>       
            
            <div className="GrantScholarshipCard" card>    
                
                <div className="TopPhoto">
                    <img className="img_1"src="http://www.sanjoaquinaudubon.org/wp-content/uploads/2022/03/WaldoHoltPic1.jpg" alt="Card cap"></img>
                </div>  
                    <div className= "GrantHeader" card-header>
                        <h3>Environmental Education and Conservation</h3>
                    </div>
                    <div className="BottomHalf" card-body>
                        <div className="GrantScholarshipInfo" class="card-body">
                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla 
                                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt 
                                sapiente ea proident. Leggings occaecat craft beer farm-to-table, 
                                raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                        <div className="ApplyButton" container>
                            <text><a href="/applicationformpage" class="btn btn-success">Apply</a></text>                
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
                </div>
                    <div className="BottomHalf" card-body>
                        <div className="GrantScholarshipInfo" class="card-body">
                        Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla 
                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt 
                        sapiente ea proident. Leggings occaecat craft beer farm-to-table, 
                        raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                        <div className="ApplyButton" container>
                            <text><a href="/applicationformpage" class="btn btn-success">Apply</a></text> 
                        </div>

                    </div>
                    
            </div> 
          
        </div>
    );

}