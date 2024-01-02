const cors = require('cors');
const express = require('express');

const config = require('./config');
const router = require('./src/router');

const { PORT } = config;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', router);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
