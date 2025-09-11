const db = require('../config/database');
const catchAsync = require('../utils/errorHandler');

exports.fetchAllAssets = catchAsync(async (req, res) => {
  const stmt = `SELECT * FROM assets`;

  const data = await db.queryAll(stmt);
  if (!data) {
    return res.status(404).json({ message: 'Failed to fetch all assets' });
  }

  return res.status(200).json(data);
});

exports.fetchAssetById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const stmt = `SELECT * FROM assets WHERE id = ?`;

  const data = await db.queryOne(stmt, [id]);
  if (!data) {
    return res.status(404).json({ message: `Asset not found with id: ${id}` });
  }
  return res.status(200).json(data);
});

exports.createAsset = catchAsync(async (req, res) => {
  const { name, ip_address, description, type } = req.body;
  const stmt = `INSERT INTO assets (name,ip_address,description,type) VALUES (?,?,?,?)`;

  const data = await db.insertOne(stmt, [name, ip_address, description, type]);

  return res.status(201).json(data);
});

exports.deleteAsset = catchAsync(async (req, res) => {
  const { id } = req.params;
  const stmt = `DELETE FROM assets WHERE id = ?`;

  const data = await db.queryOne(stmt, [id]);
  return res.status(204).json(data);
});
