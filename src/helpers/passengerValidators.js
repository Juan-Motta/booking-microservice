const passengerValidations = (passengers, ride_id) => {
    let errors = {};
    passengers.forEach((passenger, index) => {
        const { name, last_name, document, birth, phone, seat } = passenger;
        let passengerErrors = {};
        let message;

        message = nameValidation(name, last_name);
        if (message) {
            passengerErrors.name = message;
            message = null;
        }
        message = documentValidation(document);
        if (message) {
            passengerErrors.document = message;
            message = null;
        }
        message = birthValidation(birth);
        if (message) {
            passengerErrors.birth = message;
            message = null;
        }
        message = phoneValidation(phone);
        if (message) {
            passengerErrors.phone = message;
            message = null;
        }
        message = seatValidation(seat, ride_id);
        if (message) {
            passengerErrors.seat = message;
            message = null;
        }

        if (Object.keys(passengerErrors).length > 0) {
            errors[`passenger_${index}`] = passengerErrors;
        }
        return null;
    });

    return errors;
}

const nameValidation = (name, last_name) => {
    if (!name || !last_name || name.length === 0 || last_name.length === 0) {
        return `El nombre y/o apellido deben ser validos`;
    }
}

const documentValidation = (document) => {
    if (!document || document.length === 0) {
        return `El documento debe ser valido`;
    }
}

const birthValidation = (birth) => {
    if (!birth || birth.split('-').length !== 3 || Number(birth.split('-')[0]) < 1900 || Number(birth.split('-')[1]) <= 0 || Number(birth.split('-')[1]) > 12 || Number(birth.split('-')[2]) <= 0 || Number(birth.split('-')[2]) > 31) {
        return `La fecha de nacimiento debe ser valida`;
    }
}

const phoneValidation = (phone) => {
    const regex = new RegExp(/^[0-9]+$/g);
    if (!phone || phone.length === 0 || !regex.test(phone)) {
        return `El telefono debe ser valido`;
    }
}

const seatValidation = (seat) => {
    if (!seat || Number(seat) <= 0) {
        return 'El puesto debe ser valido'
    }
}

export default passengerValidations;
