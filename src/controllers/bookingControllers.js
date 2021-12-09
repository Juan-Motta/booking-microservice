import moment from 'moment';

import BookingSchema from '../models/bookingModel';
import bookingValidations from '../helpers/bookingValidators';
import { passengerValidations, passengerUpdateValidations } from '../helpers/passengerValidators';
import { isRepeatedSeat, isRepeatedSeatCreate } from '../helpers/seatValidators'

const createBooking = (req, res) => {
    // data from req
    const { ride_id, user_id, passengers } = req.body;
    // data validations
    const bookingErrors = bookingValidations(ride_id, user_id, passengers);
    const passengerErrors = passengerValidations(passengers);
    const errors = {
        ...bookingErrors,
        ...passengerErrors
    };

    // get seats from passengers obtained from body
    const seats = [];

    passengers.forEach(passenger => {
        seats.push(passenger.seat)
    })


    // if any errors
    if (Object.keys(errors).length === 0) {
        // validate if seats selected are occupied by someone else
        isRepeatedSeatCreate(ride_id, seats)
            .then(() => {
                // create booking object
                const booking = new BookingSchema();
                booking.ride_id = ride_id;
                booking.user_id = user_id;
                booking.date = moment().format('YYYY-MM-DD HH:mm');
                booking.passengers = passengers;

                // save booking
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

const getAllBookings = (req, res) => {
    // get all bookings
    BookingSchema.find({})
        .then(bookingArray => {
            res.status(200).send(bookingArray);
        })
        .catch(err => {
            res.status(500).send({ message: 'Error del servidor' });
        })
}

const getBookingsByRideId = (req, res) => {
    BookingSchema.find({ ride_id: req.params.id })
        .then(bookingArray => {
            res.status(200).send(bookingArray);
        })
        .catch(err => {
            res.status(500).send({ message: 'Error del servidor' });
        })
}

const getBookingsByUserId = (req, res) => {
    BookingSchema.find({ user_id: req.params.id })
        .then(bookingArray => {
            res.status(200).send(bookingArray)
        })
        .catch(err => {
            res.status(500).send({ message: 'Error del servidor' });
        })
}

const getBookingById = (req, res) => {
    BookingSchema.findById(req.params.id)
        .then(booking => {
            res.status(200).send(booking)
        })
        .catch(err => {
            res.status(500).send({ message: 'Error del servidor' });
        })
}

const getAvailableSeatsByRideId = (req, res) => {
    let takenSeats = [];
    BookingSchema.find({ ride_id: req.params.id })
        .then(bookingArray => {
            bookingArray.forEach(booking => {
                booking.passengers.forEach(passenger => {
                    takenSeats.push(passenger.seat)
                })
            })

            res.status(200).send({ occupied_seats: takenSeats });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error del servidor' });
        })
}

const findOneBookingAndUpdate = (req, res) => {
    let updatedBooking;
    BookingSchema.findById(req.params.id)
        .then(booking => {
            updatedBooking = booking
            if (req.body.ride_id) {
                updatedBooking.ride_id = req.body.ride_id
            }

            BookingSchema.findByIdAndUpdate(req.params.id,
                updatedBooking,
                (err, doc) => {
                    if (err) {
                        res.status(500).send({ message: 'Error del servidor' })
                    } else {
                        if (!doc) {
                            res.status(400).send({ message: 'Error al actualizar la reserva' })
                        } else {
                            res.status(200).send({ message: 'Reserva actualizada correctamente' })
                        }
                    }
                });
        })
        .catch(err => {
            res.status(500).send({ message: 'Error del servidor' });
        })
}

const findOnePassengerAndUpdateById = (req, res) => {
    let updatedPassenger;
    let rideId;
    BookingSchema.findById(req.params.booking_id)
        .then(booking => {
            rideId = booking.ride_id;
            [updatedPassenger] = booking.passengers.filter(passenger => String(passenger._id) === req.params.passenger_id)
            const errors = passengerUpdateValidations(req.body)
            if (Object.keys(errors).length === 0) {
                Object.keys(req.body).forEach(key => {
                    updatedPassenger[key] = req.body[key]
                })
            } else {
                res.status(400).send(errors);
            }
            isRepeatedSeat(rideId, req.params.passenger_id, [updatedPassenger.seat])
                .then(() => {

                    BookingSchema.findOneAndUpdate(
                        { "_id": req.params.booking_id, "passengers._id": req.params.passenger_id },
                        {
                            "$set": {
                                "passengers.$": updatedPassenger
                            }
                        },
                        (err, doc) => {
                            if (err) {
                                res.status(500).send({ message: 'Error del servidor' })
                            } else {
                                if (!doc) {
                                    res.status(400).send({ message: 'Error al actualizar la reserva' })
                                } else {
                                    res.status(200).send({ message: 'Reserva actualizada correctamente' })
                                }
                            }
                        }
                    )

                })
                .catch(message => {
                    res.status(400).send(message);
                })

        })
        .catch(err => {
            res.status(404).send({ message: 'No se encontro una reserva con el id proporcionado' })
        })

}

const deleteBooking = (req, res) => {
    BookingSchema.findByIdAndDelete({ _id: req.params.id })
        .then((result) => {
            if (!result) {
                res.status(404).send({ message: 'No existe una reserva con el id proporcionado' })
            } else {
                res.status(200).send({ message: 'Reserva eliminada correctamente' })
            }
        })
        .catch(() => {
            res.status(500).send({ message: 'Error del servidor' })
        })
}

export default {
    createBooking,
    getAllBookings,
    getBookingsByRideId,
    getBookingsByUserId,
    getBookingById,
    getAvailableSeatsByRideId,
    findOneBookingAndUpdate,
    findOnePassengerAndUpdateById,
    deleteBooking
}