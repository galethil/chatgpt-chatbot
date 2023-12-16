const dotenv = require('dotenv');
dotenv.config();

const config = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4500
});

module.exports = config;
