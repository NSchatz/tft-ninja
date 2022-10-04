import Unit from './Unit';
export default function Opponent({ Opponent }) {
  console.log(Opponent);
  const champion = Opponent.champion;
  const traits = Opponent.traits;
  const units = Opponent.units;
  console.log(units);
  return (
    <div className="matchContainer">
      <p>{Opponent.placement}</p>
      <div className="unitContainer">
        {units.map((unit) => {
          return <Unit unit={unit} />;
        })}
      </div>
    </div>
  );
}
