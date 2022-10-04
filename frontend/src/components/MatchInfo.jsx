import Unit from './Unit';
import React, { useState, Suspense } from 'react';
const OpponentsMatchInfo = React.lazy(() => import('./OpponentsMatchInfo'));
export default function MatchInfo({ userData, opponentData }) {
  const [show, setShow] = useState(false);
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
      <button onClick={() => setShow(!show)}>Show Match</button>
      {show == true ? (
        <>
          <Suspense fallback={<div>Loading...</div>}>
            <OpponentsMatchInfo opponentData={opponentData} />
          </Suspense>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
