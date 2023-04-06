import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'



export function ResetSuccess() {
  return (
    <div className="ResetSuccess">
      <div class="imdivpassword">
        <img src="https://www.sanjoaquinaudubon.org/wp-content/uploads/2019/12/SAN-JOAQUIN-AUDUBON-SOCIETY-300x300.jpg"  alt="bird" class="responseimg"></img>
      </div>

      <div class="containerty" >
        <p>Password reset link sent</p> 
        <div>
          <div >
            <a href="/login" className="passfix"> <button class = "button-pr">Back to Login</button></a>
          </div >

          <div class= "button-setter">
          <a href="/passwordchange" className="passfix"> <button class = "button-pr">Resend Link</button></a>
          </div>
           
            
        </div>   
      </div>
    </div>
  );
}