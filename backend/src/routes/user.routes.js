const express = require('express');
const router = express.Router();
const {
  createUser,
  fetchAllUsers,
  fetchUserById,
  deleteUser,
} = require('../controllers/user.controller');
const { checkUser } = require('../middlewares/auth');

router.get('/all', fetchAllUsers);
router.get('/:id', fetchUserById);
router.post('/', checkUser, createUser);
router.delete('/:id', checkUser, deleteUser);

module.exports = router;
