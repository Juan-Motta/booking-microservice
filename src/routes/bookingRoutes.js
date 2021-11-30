import express from 'express';
import controllers from '../controllers/bookingControllers';

const router = express.Router();

router.get('/id/:id', controllers.getBookingById);

router.get('/all', controllers.getAllBookings);

router.get('/all/ride/id/:id', controllers.getBookingsByRideId);

router.get('/all/user/id/:id', controllers.getBookingsByUserId);

router.get('/seats/ride/id/:id', controllers.getAvailableSeatsByRideId);

router.post('/create', controllers.createBooking);

router.put('/id/:id', controllers.findOneBookingAndUpdate);

router.put('/id/:booking_id/passenger/id/:passenger_id', controllers.findOnePassengerAndUpdateById);

router.delete('/id/:id', controllers.deleteBooking);



export default router;