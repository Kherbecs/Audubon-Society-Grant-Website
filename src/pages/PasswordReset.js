import React from 'react';
import '../css/PasswordReset.css'
import 'bootstrap/dist/css/bootstrap.min.css'



export function PasswordReset() {
  return (
    <div className="PasswordReset">
      <div class="imdiv">
        <img src="https://www.sanjoaquinaudubon.org/wp-content/uploads/2019/12/SAN-JOAQUIN-AUDUBON-SOCIETY-300x300.jpg" alt="bird"></img>
      </div>

      <div class="container"> 
        <p>Please enter the email associated with your account. You will get a link to reset your password</p>
      </div>

      <div class="wrapper-password-reset">
        <div class="container">
          <div class="form-group w-50" >
            <input type="email" class="form-control row d-flex justify-content-center" id="InputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
          </div>
        </div>
      </div>

      <div class="mb-3 mt-3 ">
          <button type="button" class="btn btn-secondary btn-lg col-2" ><a href="/resetsuccess">Submit</a></button>
      </div>
      
      <div class="form-group w-75" >
        <button type="button" class="btn btn-secondary btn-lg col-2"><a href="/login">Back</a></button>
      </div> 
         
    </div>
  );
}

