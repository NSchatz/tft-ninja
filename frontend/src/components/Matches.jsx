import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Matches() {
  const { data, isLoading, isError, message } = useSelector((state) => state.tft);
  console.log(data);
  return (
    <div>
      {data ? (
        <>
          <User data={data} />
        </>
      ) : (
        <>Loading...</>
      )}
    </div>
  );
}

function User({ data }) {
  const list1 = [];
  const list2 = [];
  for (let i = 0; i < data.matches.length; i++) {
    const participants = data.matches[i];
    for (let j = 0; j < participants.length; j++) {
      const match = participants[j].info.participants;
      list1.push(match.filter(item => {
        return item.puuid === data.puuid;
      }));
      list2.push(match.filter(item => {
        return item.puuid !== data.puuid;
      }));
    }
  }
  console.log(list2)
  return (
    <div className="matchesContainer">
      {list1.map((item, index) => {
        return <MatchInfo userData={item[0]} opponentData={list2[index]} />;
      })}
      <a id='matchLink' onClick={() => {}}></a>
    </div>
  );
}
function MatchInfo({ userData, opponentData }) {
  const [show, setShow] = useState(false)
  const champion = userData.champion;
  const traits = userData.traits;
  const units = userData.units;
  return (
    <div className="matchContainer">
      <div className="unitContainer">
        {units.map((unit) => {
          return <Unit unit={unit} />;
        })}
      </div>
      <button onClick={() => setShow(!show)}>aaaaaaaa</button>
      {show == true ? (
        <OpponentsMatchInfo opponentData={opponentData} />
      ):(
        <></>
      )

      }
    </div>
  );
}
function OpponentsMatchInfo({opponentData}) {
  console.log()
  return(
    <div>
      {opponentData.map((user) => {
        return <Opponent Opponent={user}/>;
      })}
    </div>
  )
}
function Opponent({ Opponent }) {
  console.log(Opponent)
  const champion = Opponent.champion;
  const traits = Opponent.traits;
  const units = Opponent.units;
  console.log(units);
  return (
    <div className="matchContainer">
      <div className="unitContainer">
        {units.map((unit) => {
          return <Unit unit={unit} />;
        })}
      </div>
    </div>
  );
}
function Unit({ unit }) {
  return (
    <div className="unit">
      <img
        className="champImg"
        src={require(`../data/champions/${unit.character_id}.png`)}
        alt=""
      />
      <div className="itemContainer">
        {unit.itemNames.map((item) => {
          try {
            return <img className="itemImg" src={require(`../data/items/${item}.webp`)} alt="" />;
          } catch (error) {
            console.log(error);
            return <>{item}</>;
          }
        })}
      </div>
    </div>
  );
}
