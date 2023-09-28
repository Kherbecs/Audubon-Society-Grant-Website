import React from 'react';
import '../css/LandingPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/analytics';
import 'firebase/compat/database';

import blackBird from '../assets/black-bird.jpeg'
import longLeg from '../assets/long-leg-bird.jpeg'
import groupPhoto from '../assets/group-photo.jpeg'
import eagle from '../assets/oil-scouter.jpeg'
import pelicanCousin from '../assets/pelican-cousin.jpeg'
import smallBird from '../assets/smol-bird.jpeg'


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
                  src={blackBird}
                  alt="Second slide"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <div class="d-flex justify-content-center">
                <img
                  src={longLeg}
                  alt="Third slide"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <div class="d-flex justify-content-center">
                <img
                  src={eagle}
                  alt="Third slide"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <div class="d-flex justify-content-center">
                <img
                  src={pelicanCousin}
                  alt="Third slide"
                />
              </div>
            </Carousel.Item>
            <Carousel.Item interval={6000}>
              <div class="d-flex justify-content-center">
                <img
                  src={smallBird}
                  alt="Third slide"
                />
              </div>
            </Carousel.Item>
        </Carousel>
      </div>
      <div class="info-cards">
        <Container className="my-4">
          <Row className="px-4 my-5">
            <Col lg={3} md={12} sm={12} className="mx-auto px-4 my-5 square border border-dark border-3" >
              <div className="my-3 d-grid">
                <h1 class="font-weight-light">About</h1>
                <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse, in vero cupiditate beatae quasi nobis corporis maxime inventore sequi praesentium. Officia impedit incidunt repudiandae dignissimos sequi, ipsam numquam. A!</p>
                <Button variant="success" size="lg" href="/register">Sign Up</Button>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12} className="mx-auto px-4 my-5 square border border-dark border-3" >
              <div className="my-3 d-grid">
              <h1 class="font-weight-light">Grant 1 Info</h1>
              <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse, in vero cupiditate beatae quasi nobis corporis maxime inventore sequi praesentium. Officia impedit incidunt repudiandae dignissimos sequi, ipsam numquam. A!</p>
              </div>
            </Col>
            <Col lg={3} md={12} sm={12} className="mx-auto px-4 my-5 square border border-dark border-3" >
              <div className="my-3 d-grid">
                <h1 class="font-weight-light">Grant 2 Info</h1>
                <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse, in vero cupiditate beatae quasi nobis corporis maxime inventore sequi praesentium. Officia impedit incidunt repudiandae dignissimos sequi, ipsam numquam. A!</p>
              </div>
            </Col>
          </Row>
        </Container>
        </div>
    </div>
    
  )
}