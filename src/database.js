import mongoose from 'mongoose';

//MongoDB connection
const connectDb = () => {
    mongoose.connect(process.env.MONGODB_URI)
        .then(() => {
            console.log(`Connected to MongoDB`);
        })
        .catch(err => {
            console.log(err);
        });

}

export default connectDb;
