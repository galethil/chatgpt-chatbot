const dotenv = require('dotenv');
dotenv.config();

const config = Object.freeze({
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT || 4500,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY,
  DEBUG: process.env.DEBUG === 'true' ? true : false,
  ENABLE_INPUT_MODERATION: process.env.ENABLE_INPUT_MODERATION === 'true' ? true : false,
  ENABLE_OUTPUT_MODERATION: process.env.ENABLE_OUTPUT_MODERATION === 'true' ? true : false,
  ENABLE_OUTPUT_VALIDATION: process.env.ENABLE_OUTPUT_VALIDATION === 'true' ? true : false
});

module.exports = config;
