import MatchInfo from './MatchInfo';
import { useSelector } from 'react-redux';
export default function User() {
  const { data, isLoading, isError, message } = useSelector((state) => state.tft);
  console.log(data)
  const userMatch = [];
  const opponentsMatch = [];
  for (let i = 0; i < data.matches.length; i++) {
    const participants = data.matches[i].info.participants;
    userMatch.push(
      participants.filter((item) => {
        return item.puuid === data.puuid;
      })
    );
    for (let j = 0; j < participants.length; j++) {
      const match = participants[j];
      opponentsMatch.push(participants);
    }
    
  }
  
  return (
    <div className='mainContainer'>
      <div className="summonerInfo">
        {data.name}
      </div>
      <div className="matchesContainer">
        {userMatch.map((item, index) => {
          return <MatchInfo userData={item[0]} opponentData={opponentsMatch[index]} />;
        })}
        <a id="matchLink" onClick={() => {}}></a>
      </div>
    </div>
    
  );
}
