// src/pages/TabDownload.js
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import '../styles/TabDownload.css'

const TabDownload = () => {
  return (
    <Container>
      <h2 className="header my-4 bold-font">Tab Download</h2>

      {/* First Tab */}
      <Row className="tab mb-5 regular-font">
        <Col md={4}>
          <img
            src="tab-image-1.jpg"
            alt="Tab 1"
            className="img-fluid"
          />
        </Col>
        <Col md={8}>
          <p>
            Description for Tab 1 goes here. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam scelerisque libero at
            efficitur.
          </p>
          <Button variant="primary">Buy Now</Button>
        </Col>
      </Row>

      {/* Second Tab */}
      <Row className="tab mb-5 regular-font">
        <Col md={4}>
          <img
            src="tab-image-2.jpg"
            alt="Tab 2"
            className="img-fluid"
          />
        </Col>
        <Col md={8}>
          <p>
            Description for Tab 2 goes here. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam scelerisque libero at
            efficitur.
          </p>
          <Button variant="primary">Buy Now</Button>
        </Col>
      </Row>

      {/* Third Tab */}
      <Row className="tab mb-5 regular-font">
        <Col md={4}>
          <img
            src="tab-image-3.jpg"
            alt="Tab 3"
            className="img-fluid"
          />
        </Col>
        <Col md={8}>
          <p>
            Description for Tab 3 goes here. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam scelerisque libero at
            efficitur.
          </p>
          <Button variant="primary">Buy Now</Button>
        </Col>
      </Row>

      {/* Fourth Tab */}
      <Row className="tab mb-5 regular-font">
        <Col md={4}>
          <img
            src="tab-image-4.jpg"
            alt="Tab 4"
            className="img-fluid"
          />
        </Col>
        <Col md={8}>
          <p>
            Description for Tab 4 goes here. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit. Nullam scelerisque libero at
            efficitur.
          </p>
          <Button variant="primary">Buy Now</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default TabDownload;
