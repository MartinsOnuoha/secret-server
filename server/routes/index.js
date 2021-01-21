
const express = require('express');
const app = express.Router();

const SecretController = require('../controllers/secretController');
const Required = require('../middleware/requiredFields')

app.post('/', Required.create, SecretController.makeSecret);
app.get('/:id', Required.retrieve, SecretController.getSecret)

module.exports = app;
