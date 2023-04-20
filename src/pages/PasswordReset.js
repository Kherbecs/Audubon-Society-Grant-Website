import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'



export function PasswordReset() {
  return (
    <div className="PasswordReset">
      <div className="passwordwrapper">
      
      <div class="form-password-containV2">
      <div class="imdivpassword">
        <img src="https://i.imgur.com/dLZACKu.png" alt="bird" class="responseimgV2" ></img>
      </div>
        
            <div class="wrapper-password-reset">
              <div class="containerty">
              <p className="head-text-password">Please enter the email associated with your account. You will get a link to reset your password</p>
                <div class="form-group w-100" >
                <input type="email" class="form-control justify-content-center" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
                
                </div>
              </div>
            </div>
            <div class="containerty">
              <a href="/resetsuccess" className="links-password"><button type="sign in" className="btn btn-lr btn-success btn-lg w-100 block mt-2">Submit</button></a>
            </div>
          <div class="containerty">
          <a href="/login" class="links-password ">Back</a>
          </div>
        
      </div>
      
      
      </div>
      </div> 
  );
}

