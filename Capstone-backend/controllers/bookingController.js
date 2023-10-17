
const Models = require("../models");


const getBookings = (req, res) => {

  const customerEmail = req.user.email;
  console.log('Customer Email:', customerEmail);
  

  Models.Booking.find({ customerEmail: customerEmail })
    .then(bookings => res.send(bookings))
    .catch(err => {
      console.log('Error Handler Invoked'); 
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};


const getBookedDates = (req, res) => {
  Models.Booking.find({}, { serviceDate: 1, _id: 0 })
    .then(bookings => {
      const dates = bookings.map(booking => booking.serviceDate);
      res.send(dates);
    })
    .catch(err => {
      console.log("Error handler invoked: ", err.message); 
      res.setStatusCode(500);
      res.send({ result: 500, error: err.message });
    });
};

const createBooking = (req, res) => {
  try {
    console.log("Inside controller create booking", req.body);
    //console.log(req.user);
    const bookingPayload = req.body;



    const { tutor } = bookingPayload;

    if (tutor) {
      bookingPayload.tutorName = tutor.value;
      delete bookingPayload.tutor;
    }

    new Models.Booking(bookingPayload).save()
      .then(booking => res.send(booking))
      .catch(err => {
        console.log(err);
        res.status(500).send({ result: 500, error: err.message });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send({ result: 500, error: "An error occurred when creating the booking." });
  }
};

const editBooking = (bookingId, updatedBookingData, req, res) => {
  if (!req.user || !req.user.email) {
    return res.status(401).send({ result: 401, error: "Unauthorized request. User information is missing." });
  }

  const customerEmail = req.user.email;

  Models.Booking.findOneAndUpdate(
    { _id: bookingId, customerEmail: customerEmail },
    { $set: updatedBookingData },
    { new: true }
  )
    .then(updatedBooking => {
      if (!updatedBooking) {
        res.status(404).send({ result: 404, error: "Booking not found or you don't have permission to edit." });
      } else {
        res.status(200).send(updatedBooking);
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};




const deleteBooking = (bookingId, req, res) => {

  if (!req.user || !req.user.email) {
    return res.status(401).send({ result: 401, error: "Unauthorized request. User information is missing." });
  }

  const customerEmail = req.user.email;

  Models.Booking.findOneAndDelete({ _id: bookingId, customerEmail: customerEmail })
    .then(booking => {
      if (!booking) {
        res.status(404).send({ result: 404, error: "Booking not found or you don't have permission to delete." });
      } else {
        res.status(200).send({ result: 200, message: "Booking deleted successfully" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).send({ result: 500, error: err.message });
    });
};



module.exports = {
  getBookings,
  getBookedDates,
  createBooking,
  editBooking,
  deleteBooking
};
