import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import '../styles/ServiceSelection.css';
import { useEffect } from 'react';

const ServiceSelection = ({ onNextClick, selectedService, onSelectService, onTutorSelect }) => {
  const [localSelectedService, setLocalSelectedService] = useState(selectedService);
  const [selectedTutor, setSelectedTutor] = useState(null);

  useEffect(() => {
    setLocalSelectedService(selectedService);
  }, [selectedService]);

  const handleServiceChange = e => {
    const newService = { value: e.target.value, label: e.target.options[e.target.selectedIndex].text };
    setLocalSelectedService(newService);
  };


  const tutors = [
    { value: 'Dimebag Darrell (Guitar)', label: 'Dimebag Darrell (Guitar)', image: '/assets/tutorpictures/dimeprofile.jpg' },
    { value: 'Vinnie Paul (Drums)', label: 'Vinnie Paul (Drums)', image: '/assets/tutorpictures/vinnielive.jpg' },
    { value: 'Cliff Burton (Bass)', label: 'Cliff Burton (Bass)', image: '/assets/tutorpictures/cliff.jpg' },
    { value: 'Eddie Van Halen (Guitar)', label: 'Eddie Van Halen (Guitar)', image: '/assets/tutorpictures/evhjump.jpg' },

  ];

  const services = [
    { value: '30', label: '30 mins - $30' },
    { value: '60', label: '60 mins - $60' },
  ];


  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      justifyContent: "center"
    }),
    singleValue: (provided, state) => ({
      ...provided,
      position: 'unset',
      color: 'black'
    }),
    placeholder: (provided, state) => ({
      ...provided,
      textAlign: 'center',
      color: 'black'
    }),
    option: (provided, state) => ({
      ...provided,
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: state.isFocused || state.isSelected ? 'black' : 'black',
      backgroundColor: state.isFocused ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
    })
  };


  return (
    <div>
      <h4 className='header'>Service Selection</h4>
      <Form onSubmit={e => e.preventDefault()}>
        <Form.Group controlId="serviceSelect">
          <Form.Label className='sub-select with-margin'>Select Service Duration:</Form.Label>
          <Form.Control
            className='sub-select'
            as="select"
            value={localSelectedService.value}
            onChange={handleServiceChange}
          >
            <option value="30">30 mins - $30</option>
            <option value="60">60 mins - $60</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="tutorSelect">
          <Form.Label className='sub-select with-margin'>Select Tutor:</Form.Label>
          <Select
            value={selectedTutor}
            options={tutors}
            onChange={(selected) => {
              setSelectedTutor(selected);
              onTutorSelect(selected.value);
            }}
            formatOptionLabel={({ value, label, image }) => (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={image} alt={label} width={30} style={{ marginRight: 10 }} />
                {label}
              </div>
            )}
            styles={customStyles}
          />
        </Form.Group>
        <Button
          className='mt-3'
          onClick={() => {
            if (selectedTutor) {
              onNextClick({
                selectedService: localSelectedService,
                selectedTutor: selectedTutor.label.split(" (")[0]
              });
              console.log(localSelectedService);
            } else {
              alert("Please select a tutor.");
            }
          }}
        >
          Next
        </Button>


      </Form>
    </div>
  );
};

export default ServiceSelection;
