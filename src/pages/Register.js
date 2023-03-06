import React from 'react'
import '../css/LoginAndRegister.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/*Navigation Bar that uses React JS, HTML, CSS, and Bootstrap 5*/

export function Register() {
  return (
      <div className="wrapper">
        <div className="form">

          <h2 className="mb-3">Register</h2>
          <hr />

          <div className="form-floating mb-2">
            <input type="full-name" className="form-control form-control-lg" id="full-name" placeholder="Full Name"/>
            <label htmlFor="full-name">Full Name</label>
          </div>

          <div className="form-floating mb-2">
            <input type="email" className="form-control form-control-lg" id="email" placeholder="Email Address"/>
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="form-floating mb-2">
            <input type="password" className="form-control form-control-lg" id="password" placeholder="Password"/>
            <label htmlFor="password">Password</label>
          </div>

          <div className="form-floating mb-2">
            <input type="password" className="form-control form-control-lg" id="confirm-password" placeholder="Confirm Password"/>
            <label htmlFor="confirm-password">Confirm Password</label>
          </div>
          
          <div className="form-floating form-check mb-2">
            <div className="d-flex align-items-center">
              <input type="checkbox" className="form-check-input" id="check"/>
              <label htmlFor="check" className="form-check-label">Sign Up for Grant Updates</label>
            </div>
          </div>

          <button type="submit" className="btn btn-success btn-lg w-100 block mt-2">Sign Up</button>

          <div className="link2">
            Already have an account? <a href="/">Sign in</a>
          </div>
        </div>
      </div>
  )
}