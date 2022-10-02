const express = require('express')
const twisted = require('twisted')
const app = express()
const port = 5000


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tft', require('./routes/tftRoutes'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})