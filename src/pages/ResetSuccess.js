import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'



export function ResetSuccess() {
  return (
    <div className="ResetSuccess">
      <div class="imdiv">
        <img src="https://www.sanjoaquinaudubon.org/wp-content/uploads/2019/12/SAN-JOAQUIN-AUDUBON-SOCIETY-300x300.jpg" class="img-fluid" alt="Responsive image"></img>
      </div>

      <div class="container2" >
        <p>Password reset link sent</p> 
        <div>
          <div>
            <button type="button" class="btn btn-secondary btn-lg  col-3" ><a href="/login">Back to Login</a></button>
          </div>
          <button type="button" class="btn btn-secondary btn-lg col-2" >Resend Link</button>
            
        </div>   
      </div>
    </div>
  );
}