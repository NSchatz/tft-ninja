const twisted = require('twisted')
const api = new twisted.TftApi({key:'RGAPI-358fee71-f6aa-45ce-883e-08a5094667fd'})

async function tftData(name){
    const a = {
      summonerName: '',
      puuid: '',
      matchesIds: {},
    }
    const summonerData = await api.Summoner.getByName(name , 'na1')
    console.log(summonerData.response.puuid)
    const puuid = summonerData.response.puuid
    return matchDetails(puuid)
    
  }

module.exports = {
    tftData
}