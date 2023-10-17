const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

router.post('/create', bookingController.createBooking);

router.post('/mark-unavailable', bookingController.markDateAsUnavailable);

module.exports = router;
