import Opponent from './Opponent';
export default function OpponentsMatchInfo({ opponentData }) {
  const sortedArray = opponentData.slice().sort((a, b) => a.placement - b.placement);
  return (
    <div>
      {sortedArray.map((user) => {
        return <Opponent Opponent={user} />;
      })}
    </div>
  );
}
