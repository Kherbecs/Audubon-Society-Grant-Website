import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function PasswordChange() {
    return (
      <div className="PasswordReset">
        <div class="imdivpassword">
          <img src="https://www.sanjoaquinaudubon.org/wp-content/uploads/2019/12/SAN-JOAQUIN-AUDUBON-SOCIETY-300x300.jpg" alt="bird" class="responseimg"></img>
        </div>
  
        <div class="containerty"> 
          <p>Enter your new password. It needs to be at least 6 characters long and not contain spaces</p>
        </div>
  
        <div class="wrapper-password-reset">
          <div class="containerty">
            <div class="form-group w-50" >
              <input type="email" class="form-control row d-flex justify-content-center" id="InputPassword" aria-describedby="emailHelp" placeholder="Enter password"></input>
            </div>
          </div>
        </div>
        <div class="wrapper-password-reset">
          <div class="containerty">
            <div class="form-group w-50" >
              <input type="email" class="form-control row d-flex justify-content-center" id="ConfirmPassword" aria-describedby="emailHelp" placeholder="Confirm password"></input>
            </div>
          </div>
        </div>
  
        <div class="mb-3 mt-3 ">
          <a href="/passwordfullreset" className="passfix"><button type="button" class="button-repr">Confirm</button></a>
        </div>
        
           
      </div>
    );
  }