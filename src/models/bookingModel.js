import mongoose from 'mongoose';

const bookingSchema = mongoose.Schema({
    ride_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    passengers: [
        {
            name: {
                type: String,
                required: true
            },
            last_name: {
                type: String,
                required: true
            },
            document: {
                type: String,
                required: true
            },
            birth: {
                type: String,
                required: true
            },
            phone: {
                type: String,
                required: true
            },
            seat: {
                type: Number,
                required: true
            }
        }
    ]
});

export default mongoose.model('Booking', bookingSchema);