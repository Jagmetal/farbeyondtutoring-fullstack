import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import TutorProfile from '../components/TutorProfile';


import tutorImage1 from '/assets/tutorpictures/dimeprofile.jpg';
import tutorImage2 from '/assets/tutorpictures/vinnielive.jpg';
import tutorImage3 from '/assets/tutorpictures/cliff.jpg';
import tutorImage4 from '/assets/tutorpictures/evhjump.jpg';


const MusicLessons = () => {

  const tutors = [
    {
      image: tutorImage1,
      name: 'Dimebag Darrell (Guitar)',
      description: "Step into the world of Dimebag Darrell, the iconic guitar virtuoso who revolutionized heavy metal. Explore the nuances of his legendary guitar work, from blistering solos that will leave your fingers burning to powerful riffs that define the very essence of metal. Whether you're a beginner or an experienced guitarist, our lessons will take you on a journey through Dimebag's unique style, helping you master the art of shredding like never before.",
    },
    {
      image: tutorImage2,
      name: 'Vinnie Paul (Drums)',
      description: "Feel the pulse of the drums with lessons inspired by the rhythmic genius of Vinnie Paul. Dive deep into the grooves that powered Pantera's legendary sound and learn to unleash thunderous beats that will make heads bang. Our drum lessons will help you grasp the precision and power that defined Vinnie's drumming style, making you a force to be reckoned with behind the kit.",
    },
    {
      image: tutorImage3,
      name: 'Cliff Burton (Bass)',
      description: "Embrace the low end and elevate your bass playing to new heights with lessons inspired by the one and only Cliff Burton. Delve into the rich and thunderous basslines that resonated through Metallica's iconic tracks. Our bass lessons will guide you through the innovative techniques and melodic sensibilities that defined Cliff's playing, ensuring you become a true master of the instrument.",
    },
    {
      image: tutorImage4,
      name: 'Eddie Van Halen (Guitar)',
      description: "Uncover the magic of Eddie Van Halen's guitar wizardry through our comprehensive lessons. From his groundbreaking tapping techniques to iconic licks that have become the stuff of legend, our courses will immerse you in the world of guitar innovation. Whether you're a beginner with dreams of playing like Eddie or an experienced guitarist looking to refine your skills, our lessons will help you navigate the intricacies of his timeless style.",
    },
  ];

  return (
    <Container>
      <h2></h2>
      <div className="my-4">
        {tutors.map((tutor, index) => (
          <TutorProfile key={index} {...tutor} />
        ))}
      </div>
    </Container>
  );
};

export default MusicLessons;
