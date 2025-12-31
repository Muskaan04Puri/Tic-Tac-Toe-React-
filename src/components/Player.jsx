import { useState } from "react";

const Player = ({ initialName, symbol, isActive, onChangeName }) => {

    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);
    const handleEditing = () => {
        setIsEditing((isEditing) => !isEditing);
        if(isEditing) {
          onChangeName(symbol, playerName);
        }
    }
    const handleChange = (evt) => {
        setPlayerName(evt.target.value);
    }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing ? (<input type="text" required value={playerName} onChange={handleChange} />) : (<span className="player-name">{playerName}</span>)}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;