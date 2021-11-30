import Booking from '../models/bookingModel';

const isRepeatedSeat = (ride_id, seats) => {
    return new Promise((resolve, reject) => {
        const occupiedSeats = []
        const errors = {};

        const seatsSet = new Set(seats);
        if (seats.length > seatsSet.size) {
            return reject({ message: 'Los puestos no pueden estar repetidos' });
        }
        Booking.find({ ride_id })
            .then(bookingArray => {
                bookingArray.forEach(bookingElement => {
                    bookingElement.passengers.forEach(passenger => {
                        occupiedSeats.push(passenger.seat);
                    })
                })

                seats.forEach((seat, index) => {
                    if (occupiedSeats.includes(seat)) {
                        errors[`passenger_${index}`] = {};
                        errors[`passenger_${index}`].seat = 'La silla ya se encuentra ocupada';
                    }
                })

                if (Object.keys(errors).length > 0) {
                    return reject(errors);
                }

                return resolve();

            })
            .catch(err => {
                return reject({ message: 'Error al consultar la base de datos' });
            })
    })
}

export default isRepeatedSeat;