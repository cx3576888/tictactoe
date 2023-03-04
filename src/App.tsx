import './App.css';
import React, { useState } from 'react';
import Board from './Board';
import { SquareValue } from './Square';
import calculateWinner from './calculateWinner';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState<SquareValue | null>(null);

  const handleClick = (i: number) => {
    if (winner || squares[i]) {
      return;
    }
    const newSquares = squares.slice();
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    const newWinner = calculateWinner(newSquares);
    setWinner(newWinner);
  };

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setWinner(null);
  };

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else if (!winner && squares.every((square) => square !== null)) {
      return 'Draw';
    } else {
      return `Next player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <>
      <Board squares={squares} onClick={handleClick} />
      <div className="game-info">
        <div>{renderStatus()}</div>
        <button className="game-button" onClick={handleRestart}>Restart</button>
      </div>
    </>
  );
};

export default App;