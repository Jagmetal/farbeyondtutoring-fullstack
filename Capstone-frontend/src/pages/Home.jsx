import React from 'react';
import Slideshow from '../components/SlideShow';
import '../styles/HomePage.css';
import { Link } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';

import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

import tutorImage1 from '/assets/tutorpictures/dimeprofile.jpg';
import tutorImage2 from '/assets/tutorpictures/vinnielive.jpg';
import tutorImage3 from '/assets/tutorpictures/cliff.jpg';

const Home = () => {
  const images = [
    "/assets/dimelive.jpg",
    "/assets/dimestudio.jpg",
    "/assets/vinnie.jpg",
    "/assets/panteralive.jpg",
    "/assets/vinnielive2.jpg"
  ];

  const sampleTutors = [
    {
      image: tutorImage1,
      name: 'Dimebag Darrell (Guitar)',
      description: "Step into the world of Dimebag Darrell, the iconic guitar virtuoso..."
    },
    {
      image: tutorImage2,
      name: 'Vinnie Paul (Drums)',
      description: "Feel the pulse of the drums with lessons inspired by Vinnie Paul..."
    },
    {
      image: tutorImage3,
      name: 'Cliff Burton (Bass)',
      description: "Embrace the low end and elevate your bass playing with Cliff Burton..."
    }
  ];

  return (
    <div>
      <Slideshow images={images} />

      <Container className="mt-4 d-flex justify-content-between">
        {sampleTutors.map((tutor, index) => (
          <Card key={index} style={{ width: '30%', marginBottom: '20px' }}>
            <Card.Img variant="top" src={tutor.image} />
            <Card.Body>
              <Card.Title>{tutor.name}</Card.Title>
              <Card.Text>{tutor.description}</Card.Text>
              <Link to="/music-lessons">
                <Button variant="btn btn-dark btn-sm">Read More</Button>
              </Link>
            </Card.Body>
          </Card>
        ))}
      </Container>

      <div className="social-media-icons">
        <a href="#" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
      </div>
    </div>
  );
};

export default Home;
