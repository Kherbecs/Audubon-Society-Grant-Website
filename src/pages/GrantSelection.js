import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../css/GrantSelection.css'



export function GrantSelection(){
    return(
        
        <div className="GrantSelection">
            <div className="SubmissionsButton">
                <button className="Submissions" class="btn btn-dark">
                    <text>Submissions</text>
                </button>
            </div>

            <div class="header">
                <h1>San Joaquin Audubon Society Grants</h1>
            </div>       
            
            <div className="EnvironmentalEducation-Conservation" class="card">    
                
                <div className="TopPhoto">
                    <img src="http://www.sanjoaquinaudubon.org/wp-content/uploads/2022/03/WaldoHoltPic1.jpg" alt="Card cap"></img>
                </div>  
                    <div class="card-header">
                        <h3>Environmental Education and Conservation</h3>
                    </div>
                    <div class="card-body">
                        <div className="infoCollapse" class="card-body">
                                Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla 
                                assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt 
                                sapiente ea proident. Leggings occaecat craft beer farm-to-table, 
                                raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                        </div>
                        <div class="container">
                            <button className="apply" class="btn btn-success">
                                <text>Apply</text>
                            </button>                       
                        </div>
                    </div>

            </div>
            
            <div className="YouthScholarship-BirdingSummerCamp" class="card">
                <div className="TopPhoto_2">
               
                    <img className= "img_2" 
                        src="https://www.sanjoaquinaudubon.org/wp-content/uploads/2019/12/1.png" 
                        alt="BlueBird"
                        ></img>
      
                </div>  
                <div class="card-header">
                    <h3>Youth Scholarship and Birding Summer Camp</h3>
                </div>
                    <div class="card-body">
                        <div className="infoCollapse" class="card-body">
                        Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla 
                        assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt 
                        sapiente ea proident. Leggings occaecat craft beer farm-to-table, 
                        raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                        <div class="container">
                            <button className="apply" class="btn btn-success">
                                <text>Apply</text> 
                            </button> 
                        </div>

                    </div>
                    
            </div> 
          
        </div>
    );

}

