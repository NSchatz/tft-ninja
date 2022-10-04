const express = require('express');
const twisted = require('twisted');
const dotenv = require('dotenv').config();
const app = express();
const port = 5000;
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/tft', require('./routes/tftRoutes'));

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));
//   app.get('*', (req, res) =>
//     res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
//   );
// } else {
//   app.get('/', (req, res) => res.send('Please set to production'));
// }

app.listen(port, () => console.log(`Server started on port ${port}`));
// var parse = require('pg-connection-string').parse;
