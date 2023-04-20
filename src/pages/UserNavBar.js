import React from 'react'
import '../css/NavBar.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'

/*Navigation Bar that uses React JS, HTML, CSS, and Bootstrap 5*/

export function UserNavBar() {
  return (
    <div class="navbar-div">
        <nav class="navbar navbar-expand-lg sticky-top" id='navbar-custom'>
          <a class="navbar-brand" href="/">
            <img src="https://i.imgur.com/dLZACKu.png" alt="bird" class="nav-img"></img>
          </a>
          <a class="navbar-brand" href="/">
            <h3 class="title-header">San Joaquin Audubon Society</h3>
          </a>
           <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="#navbarCollapse" aria-expanded="false">
             <span class="navbar-toggler-icon"></span>
           </button>
            <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
                <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/">HOME</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" href="https://www.sanjoaquinaudubon.org/">ABOUT US</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" href="/grantselection">GRANTS AND SCHOLARSHIPS</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" href="/pastsubmissions">PAST SUBMISSIONS</a>
                    </li>
                    <li class="nav-item">
                       <a class="nav-link" href="/login">LOGOUT</a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>     
  )
}