const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const db = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  optionsSuccessStatus: 200,
};

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.use('/', routes);

// Error Handler
// app.use

const server = app.listen(PORT, async () => {
  db.init();
  console.log(`App is running on Port: ${PORT}`);
});

const shutdownDB = async () => {
  console.log('Shutting down server...');
  server.close(async () => {
    try {
      await db.close();
      console.log('Database connection closed');
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  });
};

process.on('SIGINT', shutdownDB);
