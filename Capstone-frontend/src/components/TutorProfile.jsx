import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../styles/TutorProfile.css';

const TutorProfile = ({ image, name, description }) => {
  return (
    <Card className="tutor-card mb-5">
      <Row noGutters={true}>
        <Col md={4}>
          <img src={image} alt={name} className="img-fluid tutor-image" />
        </Col>
        <Col md={8}>
          <Card.Body>
            <Card.Title className="bold-font tutor-name">{name}</Card.Title>
            <Card.Text className="regular-font tutor-description">{description}</Card.Text>
            <Link to={{
              pathname: "/book-now",
              state: { selectedTutor: name }
            }}>
              <Button variant="secondary" className="mt-3">Book Now</Button>
            </Link>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default TutorProfile;
