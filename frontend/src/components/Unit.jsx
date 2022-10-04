import { useState } from "react";
export default function Unit({ unit }) {
  const [isHovering, setIsHovering] = useState(false)
  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div className="unit">
      <img  onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}
        className="champImg"
        src={require(`../data/champions/${unit.character_id}.png`)}
        alt=""
      />
      {isHovering && (
          <div>
            <img  
              className="champImg"
              src={require(`../data/champions/${unit.character_id}.png`)}
              alt=""
            />
          </div>
        )}
      <div className="itemContainer">
        {unit.itemNames.map((item) => {
          return <img className="itemImg" src={require(`../data/items/${item}.webp`)} alt="" />;
        })}
      </div>
    </div>
  );
}
