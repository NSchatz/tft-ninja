const asyncHandler = require('express-async-handler');
const twisted = require('twisted');
const dotenv = require('dotenv').config();
const api = new twisted.TftApi({ key: process.env.RIOT_KEY });
const db = require('../config/db');

async function insertMatches(puuid) {
  const matches = await api.Match.list(puuid, 'americas', { count: 15 });

  const responses = await Promise.all(
    matches.response.map(async (match) => {

      const summonerSearchText = `
      SELECT *
      FROM   summoners
      WHERE  EXISTS (
          SELECT puuid
          FROM   unnest(matchList) elem
          WHERE  elem LIKE $1 AND puuid = $2
      );`;
      const valuesSum = [match, puuid];

      const querySum = await db.query(summonerSearchText, valuesSum);
      console.log('bbbbbbbbbbbbbbbbbbbbbbbbb')
      console.log(querySum)
      if (querySum.rowCount == 0) {
        const summonerMatchText = `
          UPDATE summoners SET matchList = array_append(matchList,$1) WHERE puuid = $2
          `;

        const valuesMatch = [match, puuid];

        const queryMatch = await db.query(summonerMatchText, valuesMatch);
        console.log(queryMatch)
      }

      const matchInfo = await api.Match.get(match, 'americas');
      const searchText = `
      SELECT matchID FROM matches WHERE matchID = $1;`;
      const values = [match];

      const query = await db.query(searchText, values);
      console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqq')
      console.log(query)
      if (query.rowCount == 0) {
        const matchText = `
          INSERT INTO matches (matchID, matchInfo)
          SELECT $1, $2
          `;
        const values = [match, matchInfo.response];
        return await db.query(matchText, values);
      }
      
    })
  );
  
}

async function insertSummoners(puuid) {
  const createTableText = `
  CREATE TABLE matches(
    _id int NOT NULL PRIMARY KEY,
    matchID varchar(255) NOT NULL,
    matchInfo json NOT NULL,
  );`;

  const values = [puuid, await api.Summoner.getByPUUID(puuid, 'na1')];
  return db.query(match, values);
}

const updateDatabase = asyncHandler(async (req, res) => {
  db.query();

  res.status(200).json({
    puuid: puuid,
    matches: [await api.Match.listWithDetails(puuid, 'americas', { count: 15 })]
  });
});

const getDatabase = asyncHandler(async (req, res) => {
  const {
    response: { puuid, name }
  } = await api.Summoner.getByName('ownedpears', 'na1');
  async function SummonerMatchlist(puuid){
    
    const searchUser = `SELECT matchList FROM summoners WHERE puuid = $1`
    const valuesUser = [puuid];
    return await db.query(searchUser, valuesUser)
  }
  async function SummonerMatches(queryUser){
    console.log(queryUser)
    const matcha = Promise.all(queryUser.rows[0].matchlist.map(async (match) => {
      const searchText = `SELECT * FROM matches WHERE matchID = $1`;
      const values = [match];
      const query = await db.query(searchText, values);
      return query.rows[0].matchinfo
    }))
    return matcha
  }
  async function InsertSummoner(puuid, name){
    const insertSummoner = `INSERT INTO summoners (puuid, summonerName) SELECT $1, $2`;
    const values = [puuid, name]
    return await db.query(insertSummoner, values)
  }
  const matches = await SummonerMatches(await SummonerMatchlist(puuid))
  // let data
  // insertMatches(puuid)
  // if(SummonerMatchlist(puuid).rowCount == 0){
    
    // data = await InsertSummoner(puuid, name).then(await insertMatches(puuid))
    // .then(await SummonerMatchlist(await SummonerMatches(puuid)))
    
  // }else{
    // insertMatches(puuid)
    // console.log(await SummonerMatches(await SummonerMatchlist(puuid)))
  // }
  // console.log(await SummonerMatchlist(puuid))
   
  res.status(200).json({puuid: puuid, matches: matches, name: name});
});

module.exports = {
  updateDatabase,
  getDatabase
};

// const acreateTableText = `
//     CREATE TABLE summoners(
//       puuid varchar(255) NOT NULL,
//       summonerName varchar(255) NOT NULL,
//       matchList text[]
//     );`
//   await db.query(acreateTableText);
// const createTableText = `
//   CREATE TABLE matches(
//     _id int NOT NULL PRIMARY KEY,
//     matchID varchar(255) NOT NULL,
//     matchInfo json NOT NULL
//   );`
// const acreateTableText = `
//   CREATE TABLE summoners(
//     _id int NOT NULL PRIMARY KEY,
//     puuid varchar(255) NOT NULL,
//     summonerName varchar(255) NOT NULL
//   );`

//   const values = [person.fullname, person.gender, person.phone, person.age];
//   return pool.query(text, values);
// await db.query(createTableText);
// await db.query(acreateTableText);

// const now = new Date();
// const insertText =
//   'INSERT INTO dates(date_col, timestamp_col, timestamptz_col) VALUES ($1, $2, $3)';
// await db.query(insertText, [now, now, now]);

//   const result = await db.query('SELECT * FROM summoners');
//   const result1 = await db.query('SELECT * FROM matches');
//   console.log(result.rows);
//   console.log(result1.rows);
// }
