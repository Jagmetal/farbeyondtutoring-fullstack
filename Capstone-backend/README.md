Backend Application
This application manages the booking system for tutoring sessions, providing endpoints to manage user bookings.

Getting Started
These instructions will guide you through the setup and installation process of the backend.

Prerequisites
Node.js
npm
MongoDB
A valid .env file containing the necessary environment variables, including MONGODB_URI for the database connection.

Installation

Clone the repository:

git clone <https://github.com/Jagmetal/Capstone-backend>
cd </Capstone-backend>

Install the required dependencies:

npm install
Start the server:

npm start
The server will start on the port defined in the .env file or 8080 by default.

API Endpoints
Bookings
GET /api/bookings: Retrieve all bookings.
GET /api/bookings/dates: Fetch all booked dates.
GET /api/bookings/userBookings: Fetch bookings specific to a user, requires JWT authentication.
POST /api/bookings: Create a booking, requires JWT authentication.
PUT /api/bookings/:bookingId: Edit a specific booking by its ID, requires JWT authentication.
DELETE /api/bookings/:bookingId: Delete a specific booking by its ID, requires JWT authentication.
Users & Posts
Additional endpoints are provided for users and posts, which can be found in their respective routes.
Middleware
JWT Validation: Validates incoming requests to ensure they contain a valid JWT where required.
Models
Booking: Represents a tutoring booking, containing fields such as service name, date, customer information, and tutor name.
Testing

To run the tests:

npm test

Built With:
Express
Mongoose
jsonwebtoken
jwks-rsa

License

This project is licensed under the MIT License.