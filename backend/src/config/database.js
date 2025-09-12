const sqlite3 = require('sqlite3').verbose();

class Database {
  constructor(filename = ':memory:') {
    this.db = new sqlite3.Database(filename, (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log('Connected to the ' + filename + ' database.');
      }
    });
  }

  init() {
    this.db.serialize(() => {
      // create tables
      this.seedDB();
      console.log('Database is initialized');
    });
  }

  seedDB() {
    this.seedTables();
  }

  seedTables() {
    this.db.run(
      `CREATE TABLE IF NOT EXISTS "assets" (
	        "id"	INTEGER,
	        "name"	TEXT,
	        "ip_address"	TEXT NOT NULL UNIQUE,
	        "description"	INTEGER,
	        "type"	TEXT,
	        PRIMARY KEY("id" AUTOINCREMENT));`,
    );
    this.db.run(
      `CREATE TABLE IF NOT EXISTS "users" (
	        "id"	INTEGER NOT NULL,
	        "name"	TEXT,
	        "is_admin"	INTEGER DEFAULT 0,
	        PRIMARY KEY("id" AUTOINCREMENT));`,
    );
    this.db.run(`CREATE TABLE IF NOT EXISTS "reservations" (
	        "id"	INTEGER,
	        "asset_id"	INTEGER,
	        "user_id"	INTEGER,
	        "time"	INTEGER,
	        "duration"	INTEGER,
	        PRIMARY KEY("id" AUTOINCREMENT),
	        FOREIGN KEY("asset_id") REFERENCES "assets"("id"),
	        FOREIGN KEY("user_id") REFERENCES "users"("id"));`);
  }

  queryAll(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.all(sql, params, (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  queryOne(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.get(sql, params, (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  insertOne(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.db.run(sql, params, function (err) {
        if (err) reject(err);
        else resolve({ lastID: this.lastID, changes: this.changes });
      });
    });
  }

  close() {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

const db = new Database('./database.sqlite');
module.exports = db;
