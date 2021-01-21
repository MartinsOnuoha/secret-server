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
app.use('/api/secret', indexRoutes);

/** start server  */
app.listen(process.env.PORT, () => {
  console.log(`Secret Server running on ${PORT} ✅`)
})


