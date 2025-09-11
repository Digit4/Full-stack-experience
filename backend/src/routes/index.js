const express = require('express');
const router = express.Router();

// sample response
router.get('/', (req, res) => {
  res.json({ success: true, info: 'Success, API is running' });
});

module.exports = router;
