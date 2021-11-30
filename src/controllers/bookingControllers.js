import moment from 'moment';

import BookingSchema from '../models/bookingModel';
import bookingValidations from '../helpers/bookingValidators';
import passengerValidations from '../helpers/passengerValidators';
import isRepeatedSeat from '../helpers/seatValidators'

const createBooking = (req, res) => {
    // data from req
    const { ride_id, user_id, passengers } = req.body;

    // data validations
    const bookingErrors = bookingValidations(ride_id, user_id, passengers);
    const passengerErrors = passengerValidations(passengers, ride_id);
    const errors = {
        ...bookingErrors,
        ...passengerErrors
    };

    const seats = [];

    passengers.forEach(passenger => {
        seats.push(passenger.seat)
    })

    if (Object.keys(errors).length === 0) {
        isRepeatedSeat(ride_id, seats)
            .then(() => {
                const booking = new BookingSchema();
                booking.ride_id = ride_id;
                booking.user_id = user_id;
                booking.date = moment().format('YYYY-MM-DD HH:mm');
                booking.passengers = passengers;

                booking.save((err, bookingStored) => {
                    if (err) {
                        res.status(500).send({ message: 'Error del servidor' });
                    } else {
                        if (!bookingStored) {
                            res.status(404).send({ message: 'Error al crear la reserva' });
                        } else {
                            res.status(200).send({ booking: bookingStored });
                        }
                    }
                });
            })
            .catch(message => {
                res.status(400).send(message);
            })
    } else {
        res.status(400).send(errors);
    }
}

export default {
    createBooking
}