const asyncHandler = require('express-async-handler');
const twisted = require('twisted');
const dotenv = require('dotenv').config();
const api = new twisted.TftApi({ key: process.env.RIOT_KEY });
console.log(process.env.RIOT_KEY);
const a = {
  summonerName: '',
  puuid: '',
  matchesIds: {}
};

const getSummoner = asyncHandler(async (req, res) => {
  const {
    response: { puuid }
  } = await api.Summoner.getByName(req.query.name, 'na1');
  res.status(200).json({
    puuid: puuid,
    matches: [await api.Match.listWithDetails(puuid, 'americas', { count: 10 })]
  });
});

function items() {}

const getTftMatches = asyncHandler(async (req, res) => {
  if (!req.body.puuid) {
    res.status(400);
    throw new Error('Please add a text field');
  }

  const {
    response: { puuid }
  } = await getSummonerTft();

  res.status(200).json(puuid);
});

// @desc    Update goal
// @route   PUT
// @access  Private

module.exports = {
  getTftMatches,
  getSummoner
};
