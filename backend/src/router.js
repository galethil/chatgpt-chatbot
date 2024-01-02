const express = require('express');

const router = express.Router();

router.post('/prompt', async (req, res, next) => {
  res.send('OK');
});

module.exports = router;
