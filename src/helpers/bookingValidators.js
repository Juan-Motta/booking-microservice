const bookingValidations = (ride_id, user_id, passengers) => {
    let errors = {};
    if (!ride_id) {
        errors.ride_id = 'El id de trayecto es requerido';
    }
    if (!user_id) {
        errors.user_id = 'El id de usuario es requerido';
    }
    if (passengers.length === 0) {
        errors.passengers = 'Debe haber al menos un pasajero registrado en la reserva'
    }

    if (Object.keys(errors).length > 0) {
        return errors;
    }

    return null;
}

export default bookingValidations;