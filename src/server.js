import express from 'express';

import bookingRoutes from './routes/bookingRoutes';

const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.use(express.json());

//Routes
app.use('/api/bookings', bookingRoutes)


export default app;