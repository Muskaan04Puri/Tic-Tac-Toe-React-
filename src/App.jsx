import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WIN_CASES } from "./win-cases";
import GameOver from "./components/GameOver";

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";
  if(gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {

  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2"
  });
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((innerArray) => [...innerArray])];

  for (const turn of gameTurns) {
    const { tile, player } = turn;
    const { row, col } = tile;

    gameBoard[row][col] = player;
  }

  let winner;
  for(const win_case of WIN_CASES) {
    const firstTileSymbol = gameBoard[win_case[0].row][win_case[0].column];
    const secondTileSymbol = gameBoard[win_case[1].row][win_case[1].column];
    const thirdTileSymbol = gameBoard[win_case[2].row][win_case[2].column];

    if(firstTileSymbol && firstTileSymbol === secondTileSymbol && firstTileSymbol === thirdTileSymbol) {
      winner = firstTileSymbol;
    }
  }

  const isDraw = gameTurns.length === 9 && !winner;
  const handleReset = () => setGameTurns([])

  const handlePlayerName = (symbol, newName) => {
    setPlayers((prevPlayers) => ({...prevPlayers, [symbol]: newName}));
  }
  
  const handleTurns = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [{tile: {row: rowIndex, col: colIndex}, player: currentPlayer }, ...prevTurns]
      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={activePlayer === "X"} />
          <Player initialName="Player 2" symbol="O" isActive={activePlayer === "O"} />
        </ol>
        {(winner || isDraw) && <GameOver onReset={handleReset} winner={winner} />}
        <GameBoard onTileSelect={handleTurns} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
