import React from 'react'
import '../css/LoginAndRegister.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/*Login Page that uses React JS, HTML, CSS, and Bootstrap 5*/

export function Login() {
  return (
    <html>
      <div className="wrapper-lr">
        <div className="form-lr">
          <h2 className="mb-3 h2-lr">Login</h2>
          <hr className="hr-lr"/>

          <div className="form-floating mb-2">
            <input type="email" className="form-control form-control-lg" id="email" placeholder="Email Address"></input>
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="form-floating mb-2">
            <input type="password" className="form-control form-control-lg" id="password" placeholder="Password"></input>
            <label htmlFor="password">Password</label>
          </div>

          <div className="link1-lr">
            <a href="/passwordreset" className="link-lr2">Forgot password?</a>
          </div>
          <a href="/grantselection" className="link-lr"><button type="sign in" className="btn btn-lr btn-success btn-lg w-100 block mt-2">Sign In</button></a>
          <div className="link2-lr">
            <a href="/adminportal" className="link-lr2">Need</a> an account? <a class="one" href="/register" className="link-lr2">Sign up</a>
          </div>
  
        </div>
      </div>
    </html>
  )
}