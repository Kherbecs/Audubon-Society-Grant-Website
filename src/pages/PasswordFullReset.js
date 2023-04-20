import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function PasswordFullReset() {
    return (
      <div className="PasswordReset">
        <div className="passwordwrapper">
        <div class="form-password-containV2">
        <div class="imdivpassword">
          <img src="https://i.imgur.com/dLZACKu.png" alt="bird" class="responseimgV2"></img>
        </div>
        <div class="containerty"> 
          <p className="head-text-password">Your password has been reset</p>
        </div>
  
        
  
        <div class="mb-3 mt-3 ">
        <a href="/login" className="passfix"><button type="button" class="btn btn-lr btn-success btn-lg w-100 block mt-2">Back to Login</button></a>
        </div>
      
      </div> 
      </div>
      </div>
    );
    }