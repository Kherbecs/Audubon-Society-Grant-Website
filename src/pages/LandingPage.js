import React from 'react'
import '../css/LandingPage.css'
import 'bootstrap/dist/css/bootstrap.min.css'


import { Col, Row, Container, Button, Carousel } from 'react-bootstrap'


export function LandingPage() {
  return (
    <div class="wrapper-landingpage">
      <div class="carousel-div">
        <Carousel>
          <Carousel.Item className="carousel-item" interval={1000}>
              <img  
                className="d-block w-100"
                src="https://picsum.photos/1920/1080"
                alt="First slide"
                style={{height: '790px'}}
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                className="d-block w-100"
                src="https://picsum.photos/1920/1080"
                alt="Second slide"
                style={{height: '790px'}}
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/1920/1080"
                alt="Third slide"
                style={{height: '790px'}}
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </Carousel.Caption>
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