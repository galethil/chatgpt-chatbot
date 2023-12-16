const cors = require('cors');
const express = require('express');

const config = require('./config');

const { PORT } = config;

const app = express();
app.use(cors());
app.use(express.json());


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));