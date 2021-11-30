import express from 'express';
import controllers from '../controllers/bookingControllers';

const router = express.Router();

router.get('/id/:id', (req, res) => {
    res.send('Reserva');
});

router.get('/code/:code', (req, res) => {
    res.send('especifico');
});

router.get('/all', (req, res) => {
    res.send('All');
});

router.get('/all/ride/id/:id', (req, res) => {
    res.send('All');
});

router.get('/all/user/id/:id', (req, res) => {
    res.send('All');
});

router.post('/create', controllers.createBooking);

router.put('/id/:id', (req, res) => {
    res.send('Reserva');
});

router.delete('/id/:id', (req, res) => {
    res.send('Reserva');
});



export default router;