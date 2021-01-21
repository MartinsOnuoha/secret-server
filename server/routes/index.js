
const express = require('express');
const app = express.Router();

const SecretController = require('../controllers/secretController');

app.post('/', SecretController.makeSecret);
app.get('/:hash', SecretController.getSecret)

module.exports = app;
