import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { fetchBookedDates } from '../services/apiService.js';
import '../styles/CalendarDatePicker.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

const CalendarDatePicker = ({ onBackClick, onNextClick, selectedService }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [bookedDates, setBookedDates] = useState([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    fetchBookedDates()
      .then(data => {
        const fetchedDates = data.map(dateStr => new Date(dateStr));
        setBookedDates(fetchedDates);
      })
      .catch(error => {
        console.error("Error fetching booked dates:", error);
      });
  }, []);

  const generateTimeSlots = () => {
    let slots = [];
    const duration = parseInt(selectedService?.value) || 30; // Default to 30 mins if no service selected

    for (let i = 9; i <= 15; i++) {
      if (duration === 30) {
        slots.push(`${i}:00 - ${i}:30`);
      } else if (duration === 60) {
        if (i !== 15) {
          slots.push(`${i}:00 - ${(i + 1)}:00`);
        }
      }
    }
    return slots;
  };

  const isTimeSlotUnavailable = timeSlot => {
    const selectedDateTime = new Date(selectedDate);
    const [startHour, startMinute] = timeSlot.split(':');
    selectedDateTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);

    return bookedDates.some(bookedDateTime => {
      return (
        bookedDateTime.getTime() === selectedDateTime.getTime()
      );
    });
  };

  useEffect(() => {
    const times = generateTimeSlots();
    const availableTimes = times.filter(time => !isTimeSlotUnavailable(time));
    setAvailableTimeSlots(availableTimes);
  }, [selectedDate, bookedDates, selectedService]);

  return (
    <div>
      <h4>Date & Time:</h4>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          shouldDisableDate={date => bookedDates.some(d => d.toISOString().split('T')[0] === date.toISOString().split('T')[0])}
          disablePast
          textField={<TextField />}
          style={{ marginBottom: '20px' }}
        />
      </LocalizationProvider>

      <h5>Time Slots:</h5>
      <div className="time-slots-container">
        {availableTimeSlots.map((time, index) => (
          <Button
            key={index}
            variant="outline-primary"
            className={`m-2 ${isTimeSlotUnavailable(time) ? 'disabled' : ''}`}
            onClick={() =>
              onNextClick(
                `${selectedDate.toISOString().split('T')[0]}T${time.split(' - ')[0].padStart(5, '0')}:00`
              )
            }
          >
            {time}
          </Button>
        ))}
      </div>

      <div className="text-center mt-3">
        <Button variant="primary" className="ml-3" onClick={onBackClick}>
          Back
        </Button>
      </div>
    </div>
  );
};

export default CalendarDatePicker;
