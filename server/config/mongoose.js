const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config');
const url = app.get('env') === "production" ? process.env.PROD_DB : config.mongoURI[app.settings.env];


console.log(`Environment is ${app.get('env')} ✅`);

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
})
  .then(success => console.log(`Connection to mongoose successful. ✅ \nUsing: ${url} ✅`))
  .catch(err => console.error("Could not connect to mongoose ", err));


process.on('exit', () => {
  mongoose.connection.close();
})


module.exports = mongoose;
