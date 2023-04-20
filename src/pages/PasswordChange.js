import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function PasswordChange() {
    return (
      <div className="PasswordReset">
        <div className="passwordwrapper">
        <div class="form-password-containV2">
        <div class="imdivpassword">
          <img src="https://i.imgur.com/dLZACKu.png" alt="bird" class="responseimgV2"></img>
        </div>
        <div class="containerty"> 
          <p className="head-text-password">Enter your new password</p>
        </div>
  
        <div class="wrapper-password-reset">
          <div class="containerty">
            <div class="form-group w-100" >
              <input type="email" class="form-control justify-content-center" id="InputPassword" aria-describedby="emailHelp" placeholder="Enter password"></input>
              <p className="small-text-password">Your new password needs to be at least 6 characters long and not contain spaces.</p>
              
            </div>
          </div>
        </div>
        <div class="wrapper-password-reset">
          <div class="containerty">
            <div class="form-group w-100" >
              <input type="email" class="form-control justify-content-center" id="ConfirmPassword" aria-describedby="emailHelp" placeholder="Confirm password"></input>
            </div>
          </div>
        </div>
  
        <div class="mb-3 mt-3 ">
          <a href="/passwordfullreset" className="passfix"><button type="button" class="btn btn-lr btn-success btn-lg w-100 block mt-2">Confirm</button></a>
        </div>
        </div>
        </div> 
      </div>
    );
  }