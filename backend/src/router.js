const express = require('express');
const { prompt } = require('./controller');

const router = express.Router();

router.post('/prompt', async (req, res, next) => {
  const message = req.body.message;

  const chatGPTResponse = await prompt(message);

  if (!chatGPTResponse) {
    return res.statusCode(500).send('Error');
  }
  return res.send(chatGPTResponse);
});

module.exports = router;
