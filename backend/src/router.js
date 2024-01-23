const express = require('express');
const { prompt } = require('./controller');

const router = express.Router();

router.post('/prompt', async (req, res, next) => {
  const message = req.body.message;
  const sessionId = req.headers.sessionid;

  const chatGPTResponse = await prompt(message, sessionId);

  if (!chatGPTResponse) {
    return res.status(500).send('Error');
  }
  return res.send(chatGPTResponse);
});

module.exports = router;
