import React from 'react'
import '../css/NavBar.css'
import 'bootstrap/dist/css/bootstrap.min.css'

/*Navigation Bar that uses React JS, HTML, CSS, and Bootstrap 5*/

export function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <label className="navbar-brand">San Joaquin Audubon Society Grants</label>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="#">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="https://www.sanjoaquinaudubon.org/">About Us</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register">Sign Up</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}