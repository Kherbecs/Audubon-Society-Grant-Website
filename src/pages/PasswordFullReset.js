import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function PasswordFullReset() {
    return (
      <div className="PasswordReset">
        <div class="imdivpassword">
          <img src="https://www.sanjoaquinaudubon.org/wp-content/uploads/2019/12/SAN-JOAQUIN-AUDUBON-SOCIETY-300x300.jpg" alt="bird" class="responseimg" ></img>
        </div>
  
        <div class="containerty"> 
          <p>Your password has been reset</p>
        </div>
  
        
  
        <div class="mb-3 mt-3 ">
        <a href="/login" className="passfix"><button type="button" class="button-repr2">Back to Login</button></a>
      </div>
      
           
      </div>
    );
    }