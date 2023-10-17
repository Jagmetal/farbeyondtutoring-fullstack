import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { postBooking } from '../services/apiService';
import '../styles/YourInformation.css';

const YourInformation = ({ onBackClick, onBookingComplete, selectedDate, selectedService, selectedTutor }) => {
  const [bookingCompleted, setBookingCompleted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userAuthenticated, setUserAuthenticated] = useState(false);

  const handleCompleteBooking = async () => {

    if (!userAuthenticated) {

      console.log('User is not authenticated');
      return;
    }

    console.log("selectedDate:", selectedDate);
    console.log("selectedTutor:", selectedTutor);
    const dateForBooking = selectedDate;

    const bookingData = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      serviceName: selectedService.label.split(" - ")[0],
      serviceDate: dateForBooking,
      tutorName: selectedTutor
    };

    try {
      const user = await Auth.currentAuthenticatedUser();
      const token = user.signInUserSession.accessToken.jwtToken;

      const result = await postBooking(bookingData, token);


      if (result) {
        onBookingComplete(bookingData);
        setBookingCompleted(true);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      setUserAuthenticated(true);
    } catch (error) {
      setUserAuthenticated(false);
    }
  };

  return (
    <div>
      <h4>Your Information</h4>
      <Form>
        <Form.Group controlId="name">
          <Form.Label className="float-start">Name:</Form.Label>
          <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" className="mb-2" />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label className="float-start">Email:</Form.Label>
          <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="mb-2" />
        </Form.Group>
        <Form.Group controlId="phone">
          <Form.Label className="float-start">Phone:</Form.Label>
          <Form.Control type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone number" className="mb-2" />
        </Form.Group>
      </Form>
      <div className="text-center mt-3">
        <Button variant="primary" onClick={onBackClick} disabled={bookingCompleted}>
          Back
        </Button>
        <Button
          variant="success"
          className="ms-2"
          onClick={handleCompleteBooking}
          disabled={bookingCompleted}
        >
          {bookingCompleted ? '✓ Completed' : 'Complete Booking'}
        </Button>
      </div>
    </div>
  );
};

export default YourInformation;
