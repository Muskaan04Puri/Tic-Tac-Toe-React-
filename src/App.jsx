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

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...INITIAL_GAME_BOARD.map((innerArray) => [...innerArray])];
  for (const turn of gameTurns) {
    const { tile, player } = turn;
    const { row, col } = tile;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

const deriveWinner = (gameBoard, players) => {
  let winner;
  for(const win_case of WIN_CASES) {
    const firstTileSymbol = gameBoard[win_case[0].row][win_case[0].column];
    const secondTileSymbol = gameBoard[win_case[1].row][win_case[1].column];
    const thirdTileSymbol = gameBoard[win_case[2].row][win_case[2].column];

    if(firstTileSymbol && firstTileSymbol === secondTileSymbol && firstTileSymbol === thirdTileSymbol) {
      winner = players[firstTileSymbol];
    }
  }
  return winner;
}

const PLAYERS = {
    X: "Player 1",
    O: "Player 2"
  };

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function App() {

  const [players, setPlayers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const winner = deriveWinner(gameBoard, players);
  
  const isDraw = gameTurns.length === 9 && !winner;

  const handleReset = () => setGameTurns([]);

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
          <Player initialName={PLAYERS.X} symbol="X" isActive={activePlayer === "X"} onChangeName={handlePlayerName} />
          <Player initialName={PLAYERS.O} symbol="O" isActive={activePlayer === "O"} onChangeName={handlePlayerName} />
        </ol>
        {(winner || isDraw) && <GameOver onReset={handleReset} winner={winner} />}
        <GameBoard onTileSelect={handleTurns} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
