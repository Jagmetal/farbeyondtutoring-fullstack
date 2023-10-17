let express = require("express");
let router = express.Router();
let Controllers = require("../controllers/index.js");
const validateJwt = require('../middleware/jwtMiddleware.js');

router.get('/', (req, res) => {
    Controllers.bookingController.getBookings(req, res);
});

router.get('/dates', (req, res) => {
    Controllers.bookingController.getBookedDates(req, res);
});

router.get('/userBookings', validateJwt, (req, res) => {
    const userEmail = req.user.email;
    Controllers.bookingController.getBookingsByUserEmail(userEmail)
        .then(bookings => {
            if (bookings && bookings.length > 0) {
                res.status(200).send(bookings);
            } else {
                res.status(404).send({ result: 404, error: "No bookings found for the user." });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).send({ result: 500, error: err.message });
        });
});

router.post('/', validateJwt, (req, res) => {

    Controllers.bookingController.createBooking(req, res);
});

router.put('/:bookingId', validateJwt, (req, res) => {
    const bookingId = req.params.bookingId;
    const updatedBookingData = req.body;
    Controllers.bookingController.editBooking(bookingId, updatedBookingData, req, res);
});

router.delete('/:bookingId', validateJwt, (req, res) => {
    const bookingId = req.params.bookingId;
    Controllers.bookingController.deleteBooking(bookingId, req, res);
});


module.exports = router;

