const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  serviceName: { type: String, trim: true, required: true },
  serviceDate: { type: Date, required: true },
  customerName: { type: String, trim: true, required: true },
  customerEmail: { type: String, trim: true, required: true },
  customerPhone: { type: String, trim: true, required: true },
  tutorName: { type: String, trim: true, required: true },  
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Booking = mongoose.model("booking", bookingSchema);

module.exports = Booking;

