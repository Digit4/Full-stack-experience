const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes');

// sample response
router.get('/', (req, res) => {
  res.json({ success: true, info: 'Success, API is running' });
});

router.use('/user', userRoutes);

module.exports = router;
