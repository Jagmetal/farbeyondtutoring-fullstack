import React, { useState, useEffect } from 'react';
import parseISO from 'date-fns/parseISO';
import '../styles/EditBookingForm.css';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';

const EditBookingForm = ({ booking, onSubmit, onCancel, bookedDates }) => {

  const [selectedDate, setSelectedDate] = useState(booking.serviceDate ? parseISO(booking.serviceDate) : new Date());
  const [editedBooking, setEditedBooking] = useState({ ...booking, serviceDate: selectedDate });
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  const parsedBookedDates = bookedDates.map(dateStr => typeof dateStr === 'string' ? parseISO(dateStr) : dateStr);

  const tutors = [
    { value: 'Dimebag Darrell (Guitar)', label: 'Dimebag Darrell (Guitar)' },
    { value: 'Vinnie Paul (Drums)', label: 'Vinnie Paul (Drums)' },
    { value: 'Cliff Burton (Bass)', label: 'Cliff Burton (Bass)' },
    { value: 'Eddie Van Halen (Guitar)', label: 'Eddie Van Halen (Guitar)' },
  ];

  const services = [
    { value: '30', label: '30 mins - $30' },
    { value: '60', label: '60 mins - $60' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let updatedBooking = { ...editedBooking, [name]: value };

    if (name === "serviceTime") {
      const [startHour, startMinute] = value.split('-')[0].trim().split(':');
      updatedBooking.serviceDate.setHours(parseInt(startHour), parseInt(startMinute));
    }

    setEditedBooking(updatedBooking);
  };



  useEffect(() => {
    // Update the editedBooking.serviceDate when selectedDate changes
    setEditedBooking(prevBooking => ({
      ...prevBooking,
      serviceDate: selectedDate
    }));
  }, [selectedDate]);

  useEffect(() => {

    const generateTimeSlots = () => {
      let slots = [];
      const duration = parseInt(editedBooking.serviceName) || 30;

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

    const isTimeSlotUnavailable = (timeSlot) => {
      const selectedDateTime = new Date(selectedDate);
      const [startHour, startMinute] = timeSlot.split(':');
      selectedDateTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);

      return bookedDates.some(bookedDateTime => {
        return (
          bookedDateTime.getTime() === selectedDateTime.getTime()
        );
      });
    };

    const times = generateTimeSlots();
    const availableTimes = times.filter(time => !isTimeSlotUnavailable(time));
    setAvailableTimeSlots(availableTimes);
  }, [selectedDate, bookedDates, editedBooking]);



  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Please select a date before proceeding!');
      return;
    }
    onSubmit(editedBooking);
  };

  return (
    <div className="edit-booking-form">
      <h4>Edit Booking</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="tutorName">Tutor:</label>
          <select
            className="form-control"
            name="tutorName"
            value={editedBooking.tutorName}
            onChange={handleInputChange}
          >
            {tutors.map(tutor => (
              <option key={tutor.value} value={tutor.value}>{tutor.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serviceName">Service:</label>
          <select
            className="form-control"
            name="serviceName"
            value={editedBooking.serviceName}
            onChange={handleInputChange}
          >
            {services.map(service => (
              <option key={service.value} value={service.label}>{service.label}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="serviceDate">Date:</label>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DesktopDatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              shouldDisableDate={date => parsedBookedDates.some(d => d.toISOString().split('T')[0] === date.toISOString().split('T')[0])}

              disablePast
              textField={<TextField />}
            />
          </LocalizationProvider>
        </div>
        <div className="form-group">
          <label htmlFor="serviceTime">Time:</label>
          <select
            className="form-control"
            name="serviceTime"
            value={editedBooking.serviceTime}
            onChange={handleInputChange}
          >
            {availableTimeSlots.map(time => (
              <option key={time} value={`${time.split(' - ')[0].padStart(5, '0')}:00`}>
                {time}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
      </form>
    </div>
  );
};

export default EditBookingForm;
