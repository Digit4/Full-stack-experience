const db = require('../config/database');
const catchAsync = require('../utils/errorHandler');

exports.fetchAllUsers = catchAsync(async (req, res, next) => {
  const stmt = `SELECT id,name,is_admin FROM users`;

  const data = await db.queryAll(stmt);
  if (!Array.isArray(data)) {
    throw new Error('Failed to fetch all users');
  }

  return res.status(200).json(data);
});

exports.fetchUserById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const stmt = `SELECT id,name,is_admin FROM users WHERE id = ?`;

  const data = await db.queryOne(stmt, [id]);
  if (!data) {
    return res.status(404).json({ message: `User not found with id: ${id}` });
  }
  return res.status(200).json(data);
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, is_admin } = req.body;
  const stmt = `INSERT INTO users (name,is_admin) VALUES (?,?)`;

  const data = await db.insertOne(stmt, [name, is_admin]);

  return res.status(201).json(data);
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const stmt = `DELETE FROM users WHERE id = ?`;

  const data = await db.queryOne(stmt, [id]);
  return res.status(204).json(data);
});
