require('dotenv').config()

/** packages  */
const express = require('express');
const cors = require('cors');
const app = express();

/** routes */
const indexRoutes = require('./routes/index');

/** config  */
require('./config/mongoose');
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json());
app.use('/api/secret/', indexRoutes);
app.use('/api', (req, res) => res.status(200).json({ msg: 'Welcome to Secrets & Stuff' }))


app.use(function(req, res, next) {
  next(res.json({msg: 'This is the end of the earth'}));
});
/** start server  */
const server = app.listen(process.env.PORT, () => {
  console.log(`Secret Server running on ${PORT} ✅`)
})

/** export server object for testing  */
module.exports = server;
