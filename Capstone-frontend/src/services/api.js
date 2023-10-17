import { Auth } from 'aws-amplify';

const BASE_URL = 'http://localhost:8080/api';

export const fetchUserBookings = async () => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  const response = await fetch(`${BASE_URL}/bookings`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data;
};

export const fetchUserBooking = async (bookingId) => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data;
};

export const deleteBooking = async (bookingId) => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  const data = await response.json();
  return data;
};

export const editBooking = async (bookingId, updatedBookingData) => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },

    body: JSON.stringify(updatedBookingData)
  });

  const data = await response.json();
  return data;
};
