const express = require('express');
const router = express.Router();
const {
  createReservation,
  deleteReservation,
  fetchAllReservations,
  fetchReservationById,
} = require('../controllers/reservation.controller');

router.post('/', createReservation);
router.get('/all', fetchAllReservations);
router.get('/', fetchReservationById);
router.delete('/:id', deleteReservation);

module.exports = router;
