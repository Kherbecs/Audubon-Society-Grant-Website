import React from 'react';
import '../css/LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/database';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import bird1 from '../assets/bird_1.jpg'
import bird2 from '../assets/bird_2.jpg'
import groupPhoto from '../assets/group-photo.jpeg'
import landscape from '../assets/landscape_1.jpg'


import { Col, Row, Container, Button, Carousel } from 'react-bootstrap'
const adminFirebaseConfig = {
  apiKey: "AIzaSyB0pkdIGT5RiCe5jPY2628O27X_sTk3Xn4",
  authDomain: "team-pwd-admin.firebaseapp.com",
  projectId: "team-pwd-admin",
  storageBucket: "team-pwd-admin.appspot.com",
  messagingSenderId: "445587795844",
  appId: "1:445587795844:web:9b1ed3d5902ddca9d577d1",
  measurementId: "G-0FLPMK8X2Z"
};

const adminApp = firebase.initializeApp(adminFirebaseConfig);
console.log(adminApp);
const adminAuth = adminApp.auth();
const db = firebase.database();
const dbRef = db.ref("numHits");

export function LandingPage() {
  const history = useHistory();

  const handleRegisterClick = () => {
    history.push('/register');
    window.location.reload();
  };
  
const userCookieName = "returningVisitor";
checkUserCookie(userCookieName);

function checkUserCookie(userCookieName){
  const regEx = new RegExp(userCookieName,"g");
  const cookieExists = document.cookie.match(regEx);
  if(cookieExists != null){
      console.log("cookie already exists")
  }else{
      createUserCookie(userCookieName); 
      dbRef.transaction(
          (numHits) => numHits + 1,
          (error) => {
              if(error){
              console.log(error);
          }else{
              console.log("hit success")
          }
      })
  }
}
function createUserCookie(userCookieName){
  const userCookieValue = "Yes";
  const userCookieDays = 365;
  let expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + userCookieDays);
  document.cookie = userCookieName + "=" + userCookieValue + "; expires=" + expiryDate.toLocaleTimeString() + "path=/";
}

  return (
    <div class="wrapper-landingpage">
      <div class="carousel-div">
        <Carousel controls={false} indicators={false}>
          <Carousel.Item className="carousel-item" interval={6000}>
              <div class="d-flex justify-content-center">
                <img  
                  src={groupPhoto}
                  alt="First slide"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <div class="d-flex justify-content-center">
                <img
                  src={bird1}
                  alt="Second slide"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <div class="d-flex justify-content-center">
                <img
                  src={bird2}
                  alt="Third slide"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <div class="d-flex justify-content-center">
                <img
                  src={landscape}
                  alt="Third slide"
                />
              </div>
            </Carousel.Item>
        </Carousel>
      </div>
      <div class="info-cards">
        <Container className="my-4">
          <Row className="px-4 my-5">
            <Col lg={3} md={12} sm={12} className="mx-auto px-7 my-5 square border border-dark border-3" >
              <div className="my-3 d-grid">
                <h2 class="font-weight-light">About</h2>
                <p class="mt-4">
                  Using this site, you can apply directly for any currently available grants offered by the San Joaquin Audubon Society! If you're new here, click sign up! After signing up, navigate to the "Grants and Scholarships" button on the top of your screen to apply for grants! Use the "Past Submissions" button to view your submitted applications!</p>
                <Button variant="success" size="lg" onClick={handleRegisterClick}>Sign Up</Button>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12} className="mx-auto px-7 my-5 square border border-dark border-3" >
              <div className="my-3 d-grid">
              <h2 class="font-weight-light">Environmental Education and Conservation</h2>
              <p class="mt-4">San Joaquin Audubon Society (SJAS) provides grant funds for organization working to conserve our local environment. We encourage groups to apply that are interested in birding, conservation, restoration, and environmental literacy. Grants are funded for projects located within San Joaquin County.</p>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12} className="mx-auto px-7 my-5 square border border-dark border-3" >
              <div className="my-3 d-grid">
                <h2 class="font-weight-light">Steve Stocking Youth Environmental Scholarship</h2>
                <p class="mt-4">The Steve Stocking Youth Environmental Scholarship Fund provides support to send interested youth to environmental camps or programs to foster knowledge and appreciation of nature and the environment. The applicant must be at least 10 years old but under 18 years old and a resident of San Joaquin County at the time of scholarship application and at the time he/she is attending the chosen camp.</p>
              </div>
            </Col>
          </Row>
        </Container>
        </div>
    </div>
    
  )
}