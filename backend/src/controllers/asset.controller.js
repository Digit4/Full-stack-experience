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

exports.reserveAsset = catchAsync(async (req, res) => {
  const { time, duration } = req.body;
  const { id } = req.params;
  const { user_id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Asset id is required' });
  } else if (!user_id) {
    return res.status(400).json({ message: 'User id is required' });
  }

  const selectStmt = `SELECT * FROM reservations WHERE asset_id = ? and (
      reservations.time + reservations.duration > ? and reservations.time < ?
    );`;

  const query = await db.queryOne(selectStmt, [id, time, time + duration]);
  if (query) {
    return res
      .status(409)
      .json({ message: 'Asset already reserved for the duration.' });
  }
  const stmt = `INSERT INTO reservations (asset_id,user_id,time,duration) VALUES (?,?,?,?)`;

  const data = await db.insertOne(stmt, [id, user_id, time, duration]);
  return res.status(201).json(data);
});

exports.pingAsset = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { time, duration } = req.query;
  const timeNum = Number(time);
  const durationNum = Number(duration);

  const stmt = `SELECT * FROM assets JOIN reservations on assets.id = reservations.asset_id where
      assets.id = ?
      and (
        reservations.time < ?
        and reservations.time + reservations.duration > ?
      );`;

  const check = await db.queryOne(stmt, [id, timeNum + durationNum, timeNum]);
  console.log(check);
  if (!check) {
    return res.status(200).json({ message: 'Asset is available' });
  }
  return res.status(409).json({ message: 'Asset is not available' });
});
