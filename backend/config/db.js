const dburl = process.env.DATABASE_URL;
console.log({
  connectionString: dburl,
  ssl: {
    rejectUnauthorized: false
  }
});

const { Pool, Client } = require('pg');
const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});
// pool.connect();
// get();
// async function get() {
//   const createTableText = `
//   CREATE TEMP TABLE dates(
//     date_col DATE,
//     timestamp_col TIMESTAMP,
//     timestamptz_col TIMESTAMPTZ
//   );
//   `;

//   await pool.query(createTableText);

//   const now = new Date();
//   const insertText =
//     'INSERT INTO dates(date_col, timestamp_col, timestamptz_col) VALUES ($1, $2, $3)';
//   await pool.query(insertText, [now, now, now]);

//   const result = await pool.query('SELECT * FROM dates');
//   console.log(result.rows);
//   pool.end();
// }

const client = new Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
});
// client.connect();
// client.end();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
};
// // client.query('SELECT NOW()', (err, res) => {
// //   console.log(err, res);
// //   client.end();
// // });

// async function registerPerson(person) {
//   const text = `
//     INSERT INTO people (fullname, gender, phone, age)
//     VALUES ($1, $2, $3, $4)
//     RETURNING id
//   `;
//   const values = [person.fullname, person.gender, person.phone, person.age];
//   return pool.query(text, values);
// }

// async function getPerson(personId) {
//   const text = `SELECT * FROM people WHERE id = $1`;
//   const values = [personId];
//   return pool.query(text, values);
// }

// async function updatePersonName(personId, fullname) {
//   const text = `UPDATE people SET fullname = $2 WHERE id = $1`;
//   const values = [personId, fullname];
//   return pool.query(text, values);
// }

// async function removePerson(personId) {
//   const text = `DELETE FROM people WHERE id = $1`;
//   const values = [personId];
//   return pool.query(text, values);
// }
