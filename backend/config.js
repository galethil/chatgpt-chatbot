const dotenv = require('dotenv');
dotenv.config();

const config = Object.freeze({
  PORT: process.env.PORT || 4500,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DEBUG: process.env.DEBUG === 'true' ? true : false,
  ENABLE_INPUT_MODERATION: process.env.ENABLE_INPUT_MODERATION === 'true' ? true : false
});

module.exports = config;
