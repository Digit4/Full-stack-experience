const db = require('../config/database');
const catchAsync = require('../utils/errorHandler');
const { convertUnixToDate } = require('../utils/helpers');

exports.fetchAllReservations = catchAsync(async (req, res) => {
  const stmt = `SELECT reservations.id as id, assets.name as asset_name, users.name as user_name, time,duration  from assets inner join reservations inner join users on assets.id = reservations.asset_id and users.id = reservations.user_id;`;

  const data = await db.queryAll(stmt);
  if (!data) {
    return res
      .status(404)
      .json({ message: 'Failed to fetch all reservations' });
  }
  const newData = data.map((i) => convertUnixToDate(i));

  return res.status(200).json(newData);
});

exports.fetchReservationById = catchAsync(async (req, res) => {
  const { asset_id, user_id } = req.query;
  const stmt = `SELECT * FROM reservations WHERE asset_id = ? and user_id = ?`;

  const data = await db.queryOne(stmt, [asset_id, user_id]);
  if (!data) {
    return res
      .status(404)
      .json({ message: `Reservation not found with id: ${id}` });
  }
  const newData = convertUnixToDate(data);

  return res.status(200).json(newData);
});

exports.createReservation = catchAsync(async (req, res) => {
  const { asset_id, user_id, time, duration } = req.body;
  const stmt = `INSERT INTO reservations (asset_id,user_id,time,duration) VALUES (?,?,?,?)`;

  const data = await db.insertOne(stmt, [asset_id, user_id, time, duration]);

  return res.status(201).json(data);
});

exports.deleteReservation = catchAsync(async (req, res) => {
  const { id } = req.params;
  const stmt = `DELETE FROM reservations WHERE id = ?`;

  const data = await db.queryOne(stmt, [id]);
  return res.status(204).json(data);
});
