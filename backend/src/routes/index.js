const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');
const assetRoutes = require('./asset.routes');
const reservationRoutes = require('./reservation.routes');

// sample response
router.get('/', (req, res) => {
  res.json({ success: true, info: 'Success, API is running' });
});

router.use('/user', userRoutes);
router.use('/asset', assetRoutes);
router.use('/reservation', reservationRoutes);

module.exports = router;
