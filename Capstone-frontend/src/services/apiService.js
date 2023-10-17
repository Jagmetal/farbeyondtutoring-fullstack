const API_BASE_URL = "http://localhost:8080/api";

export const postBooking = async (data, token = null) => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to save booking");
  }

  return await response.json();
};

export const fetchBookedDates = async () => {
  const response = await fetch(`${API_BASE_URL}/bookings/dates`);

  if (!response.ok) {
    throw new Error("Failed to fetch booked dates");
  }

  return await response.json();
};