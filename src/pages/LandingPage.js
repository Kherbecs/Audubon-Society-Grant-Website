import React from 'react'

import 'bootstrap/dist/css/bootstrap.min.css'
import './LandingPage.css'

import { Col, Row, Container, Image, Button, Carousel } from 'react-bootstrap'


function LandingPage() {
  return (
    <div className="wrapper">
        <Carousel>
          <Carousel.Item interval={1000}>
              <img
                className="d-block w-100"
                src="https://picsum.photos/1920/966"
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item interval={500}>
              <img
                className="d-block w-100"
                src="https://picsum.photos/1920/970"
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://picsum.photos/1920/970"
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
      <Container className="my-4">
        <Row className="px-4 my-5">
          <Col sm={3} className="mx-auto px-4 my-5 square border border-dark border-3" >
            <div className="my-3 d-grid">
              <h1 class="font-weight-light">About</h1>
              <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse, in vero cupiditate beatae quasi nobis corporis maxime inventore sequi praesentium. Officia impedit incidunt repudiandae dignissimos sequi, ipsam numquam. A!</p>
              <Button variant="success" size="lg">Sign up</Button>
            </div>
          </Col>
          <Col sm={3} className="mx-auto px-4 my-5 square border border-dark border-3" >
            <div className="my-3 d-grid">
            <h1 class="font-weight-light">Grant 1 Info</h1>
            <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse, in vero cupiditate beatae quasi nobis corporis maxime inventore sequi praesentium. Officia impedit incidunt repudiandae dignissimos sequi, ipsam numquam. A!</p>
            </div>
          </Col>
          <Col sm={3} className="mx-auto px-4 my-5 square border border-dark border-3" >
            <div className="my-3 d-grid">
              <h1 class="font-weight-light">Grant 2 Info</h1>
              <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse, in vero cupiditate beatae quasi nobis corporis maxime inventore sequi praesentium. Officia impedit incidunt repudiandae dignissimos sequi, ipsam numquam. A!</p>
            </div>
          </Col>
        </Row>
      </Container>  
    {/*
      <Container className="px-5 my-4">
        <Row className="px-4 my-5">
          <Col sm={7} className="px-4 my-5">
            <Image src = "https://picsum.photos/900/400"
            fluid
            rounded
            className=""/>
          </Col>
          <Col sm={5} className="px-4 my-5" >
            <h1 class="font-weight-light">Title</h1>
            <p class="mt-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut esse, in vero cupiditate beatae quasi nobis corporis maxime inventore sequi praesentium. Officia impedit incidunt repudiandae dignissimos sequi, ipsam numquam. A!</p>
            <div className="my-3 d-grid gap-2">
            <Button variant="success" size="lg">Sign up</Button>
            </div>
          </Col>
        </Row>
      </Container>
      */}
    </div>
    
  )
}

export default LandingPage