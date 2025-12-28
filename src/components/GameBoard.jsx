import { useState } from "react";

const initialGameBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
]

const GameBoard = () => {

    const [gameBoard, setGameBoard] = useState(initialGameBoard);
    const handleCellClick = (rowIndex, colIndex) => {
        setGameBoard((prevGameBoard) => {
            const updatedBoard = [...prevGameBoard.map((innerRow) => [...innerRow])];
            updatedBoard[rowIndex][colIndex] = 'X';
            return updatedBoard;
        })
    }

    return (
        <ol id="game-board">
            {gameBoard.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) => <li key={colIndex}><button onClick={() => handleCellClick(rowIndex, colIndex)}>{playerSymbol}</button></li>)}
                </ol>
            </li>)}
        </ol>
    )
}

export default GameBoard;