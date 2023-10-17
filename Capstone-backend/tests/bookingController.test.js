const { getBookedDates } = require('../controllers/bookingController.js');
const Models = require("../models");

describe('Booking Controller', () => {
    let req = {};
    let res = {};

    beforeEach(() => {
        // Reset 'req' and 'res' before each test
        req = {};

        res = {
            send: jest.fn(),
            _statusCode: 200,
            setStatusCode: function(value) {
                console.log(`Setting statusCode from ${this._statusCode} to ${value}`);
                this._statusCode = value;
            },
            getStatusCode: function() {
                console.log(`Getting statusCode: ${this._statusCode}`);
                return this._statusCode;
            }
        };

        // Clear mock implementations to ensure fresh mocks for each test
        jest.clearAllMocks();
    });

    describe('getBookedDates', () => {
        it('should fetch booked dates for all bookings', async () => {
            const mockData = [
                { serviceDate: "2023-10-18T20:00:00.000Z" },
                { serviceDate: "2023-10-20T20:00:00.000Z" }
            ];

            Models.Booking.find = jest.fn().mockResolvedValue(mockData);

            const expectedDates = ["2023-10-18T20:00:00.000Z", "2023-10-20T20:00:00.000Z"];

            console.log(`Reference of res in test before function call: ${res}`);
            await getBookedDates(req, res);

            expect(res.send).toHaveBeenCalledWith(expectedDates);
        });

        it('should handle errors gracefully', async () => {
            const mockError = new Error('DB error');
            Models.Booking.find = jest.fn().mockRejectedValue(mockError);

            console.log(`Reference of res in test before function call: ${res}`);
            await getBookedDates(req, res);

            console.log('Send function called times:', res.send.mock.calls.length);
            console.log(`Directly accessing _statusCode after function: ${res._statusCode}`);

            expect(res.getStatusCode()).toBe(500);
            expect(res.send).toHaveBeenCalledWith({ result: 500, error: mockError.message });
        });
    });
});
