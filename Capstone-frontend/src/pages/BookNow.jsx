import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import CalendarDatePicker from '../components/CalendarDatePicker';
import ServiceSelection from '../components/ServiceSelection';
import YourInformation from '../components/YourInformation';
import Checklist from '../components/CheckList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import '../styles/BookNow.css'


const BookNow = () => {
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [currentStep, setCurrentStep] = useState('ServiceSelection');
  const [bookingCompleted, setBookingCompleted] = useState([]);
  const [selectedService, setSelectedService] = useState({ value: '30', label: '30 mins - $30' });
  const [selectedTutor, setSelectedTutor] = useState(null);

  const handleNextClick = (data) => {
    console.log("Handle Next Click data:", data);
    if (currentStep === 'ServiceSelection') {
      setSelectedService(data.selectedService);
      setSelectedTutor(data.selectedTutor);
      setSelectedServices([...selectedServices, 'Service Selection']);
      setCurrentStep('CalendarDatePicker');
    } else if (currentStep === 'CalendarDatePicker') {
      setSelectedDate(data);
      setSelectedServices([...selectedServices, 'Calendar Date Picker']);
      setCurrentStep('YourInformation');
    }
  };


  const completeBooking = () => {
    setSelectedServices([...selectedServices, 'Your Information']);
    setBookingCompleted(true);
};




  const handleBackClick = () => {
    if (currentStep === 'CalendarDatePicker') {
      setSelectedServices(
        selectedServices.filter(
          (service) => service !== 'Service Selection'
        )
      );
      setCurrentStep('ServiceSelection');
    } else if (currentStep === 'YourInformation') {
      setSelectedServices(
        selectedServices.filter(
          (service) => service !== 'Calendar Date Picker'
        )
      );
      setCurrentStep('CalendarDatePicker');
    }
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <h2 className="my-4 text-center bold-font">Book Now</h2>
        <Row className="justify-content-center">

          <Col md={3} className="mb-4">
            <Checklist selectedServices={selectedServices} bookingCompleted={bookingCompleted} />
          </Col>


          <Col md={6} className="mb-4">
            <div className="service-container">
              {currentStep === 'ServiceSelection' && (
                <ServiceSelection
                  selectedService={selectedService}
                  onTutorSelect={setSelectedTutor}
                  onNextClick={handleNextClick}
                />
              )}
              {currentStep === 'CalendarDatePicker' && (
                <CalendarDatePicker
                  onBackClick={handleBackClick}
                  onNextClick={handleNextClick}
                  selectedService={selectedService}
                />
              )}
              {currentStep === 'YourInformation' && (
                <YourInformation
                  selectedDate={selectedDate}
                  onBackClick={handleBackClick}
                  onBookingComplete={completeBooking}
                  selectedService={selectedService}
                  selectedTutor={selectedTutor}
                />
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </ThemeProvider>
  );
};

export default BookNow;