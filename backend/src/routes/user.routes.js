const express = require('express');
const router = express.Router();
const {
  createUser,
  fetchAllUsers,
  fetchUserById,
  deleteUser,
} = require('../controllers/user.controller');

router.get('/all', fetchAllUsers);
router.get('/:id', fetchUserById);
router.post('/', createUser);
router.delete('/:id', deleteUser);

module.exports = router;
