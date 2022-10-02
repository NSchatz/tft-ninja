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
      list1.push(match.find((item) => item.puuid.includes(data.puuid)));
      list2.push(match.find((item) => !item.puuid.includes(data.puuid)));
    }
  }
  console.log(list2);
  return (
    <div className="matchesContainer">
      {list1.map((item) => {
        return <MatchInfo match={item} />;
      })}
    </div>
  );
}
function MatchInfo({ match }) {
  const champion = match.champion;
  const traits = match.traits;
  const units = match.units;
  console.log(units);
  return (
    <div className="unitContainer">
      {units.map((unit) => {
        return <Unit unit={unit} />;
      })}
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
