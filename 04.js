// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

// state first, UI rendering properly, then interactivity
// never mutate state
// use variables for derived state as it gets updated automatically each re-render

import React from "react";
import { useLocalStorageState } from "../utils";

const emptyBoard = Array(9).fill(null);

function Game() {
  const [currentStep, setCurrentStep] = useLocalStorageState("ttt-step", 0);
  const [history, setHistory] = useLocalStorageState("ttt-hist", [emptyBoard]);

  const currentSquares = history[currentStep];

  const nextValue = calculateNextValue(currentSquares);
  const winner = calculateWinner(currentSquares);
  const status = calculateStatus(winner, currentSquares, nextValue);

  const moves = history.map((_, step) => {
    const text = step === 0 ? "Go to start" : `Go to move ${step}`;
    const isCurrent = step === currentStep;
    return (
      <li key={step}>
        <button disabled={isCurrent} onClick={() => setCurrentStep(step)}>
          {text} {isCurrent ? "(current)" : ""}
        </button>
      </li>
    );
  });

  function selectSquare(square) {
    if (winner || currentSquares[square]) return;
    const squaresCopy = [...currentSquares];
    const newHistory = history.slice(0, currentStep + 1);

    squaresCopy[square] = nextValue;

    setHistory([...newHistory, squaresCopy]);
    setCurrentStep(newHistory.length);
  }

  function restart() {
    setHistory(emptyBoard);
    setCurrentStep(0);
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board selectSquare={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Board({ squares, selectSquare }) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  const xSquaresCount = squares.filter((r) => r === "X").length;
  const oSquaresCount = squares.filter((r) => r === "O").length;
  return oSquaresCount === xSquaresCount ? "X" : "O";
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
