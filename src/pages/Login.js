import React from 'react'
import '../css/LoginAndRegister.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/*Login Page that uses React JS, HTML, CSS, and Bootstrap 5*/

export function Login() {
  return (
      <div className="wrapper">
        <div className="form">
          <h2 className="mb-3">Login</h2>
          <hr />
          <div className="form-floating mb-2">
            <input type="email" className="form-control form-control-lg" id="email" placeholder="Email Address" />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className="form-floating mb-2">
            <input type="password" className="form-control form-control-lg" id="password" placeholder="Password" />
            <label htmlFor="password">Password</label>
          </div>
          <div className="link1">
            <a href="">Forgot password?</a>
          </div>
          <button type="submit" className="btn btn-success btn-lg w-100 block mt-2">Sign In</button>
          <div className="link2">
            Need an account? <a href="/register">Sign up</a>
          </div>
        </div>
      </div>
  )
}

/* <div className = "form-group form-check mb-2">
                        <input type = "checkbox" className = "form-check-input"></input>
                        <label htmlFor = "check" className = "form-check-label">Remember Me</label>
                    </div>*/