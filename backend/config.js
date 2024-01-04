const dotenv = require('dotenv');
dotenv.config();

const config = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4500,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DEBUG: process.env.DEBUG === 'true' ? true : false
});

module.exports = config;
