import React from 'react'
import '../css/NavBar.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

/*Navigation Bar that uses React JS, HTML, CSS, and Bootstrap 5*/

export function NavBar() {
  const history = useHistory();

  const handleLoginClick = () => {
  history.push('/login');
  window.location.reload();
};

const handleRegisterClick = () => {
  history.push('/register');
  window.location.reload();
};

const handleHomeClick = () => {
  history.push('/');
  window.location.reload();
};

  return (
    <div class="navbar-div">
      <nav class="navbar navbar-expand-lg sticky-top" id='navbar-custom'>
        <div class="container-fluid">
          <Link class="navbar-brand" onClick={handleHomeClick}>
            <img src="https://i.imgur.com/dLZACKu.png" alt="bird" class="nav-img"></img>
          </Link>
          <Link class="navbar-brand" onClick={handleHomeClick}>
            <h3 class="title-header">San Joaquin Audubon Society</h3>
          </Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="#navbarCollapse" aria-expanded="false">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarCollapse">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            < Nav.Item>
                <Nav.Link onClick={handleHomeClick}>HOME</Nav.Link>
              </Nav.Item>
              <li class="nav-item">
                <a class="nav-link" href="https://www.sanjoaquinaudubon.org/">ABOUT US</a>
              </li>
              <Nav.Item>
                <Nav.Link onClick={handleLoginClick}>LOGIN</Nav.Link>
              </Nav.Item>
              <Nav.Item>
              <Nav.Link onClick={handleRegisterClick}>SIGN UP</Nav.Link>
            </Nav.Item>
            </ul>
          </div>
        </div>
      </nav>
    </div>     
  )
}