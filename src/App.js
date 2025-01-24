import React, { useState } from 'react';
import './App.css';

const gridSize = 100;

const App = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [diceRoll, setDiceRoll] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const rollDice = () => {
    if (isMoving) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    setIsMoving(true);
  };

  const movePlayer = (direction) => {
    if (!isMoving) return;

    let newX = playerPosition.x;
    let newY = playerPosition.y;

    switch (direction) {
      case 'up':
        newY = Math.max(0, newY - diceRoll);
        break;
      case 'down':
        newY = Math.min(gridSize - 1, newY + diceRoll);
        break;
      case 'left':
        newX = Math.max(0, newX - diceRoll);
        break;
      case 'right':
        newX = Math.min(gridSize - 1, newX + diceRoll);
        break;
      default:
        break;
    }

    setPlayerPosition({ x: newX, y: newY });
    setIsMoving(false);
  };

  return (
    <div className="App">
      <h1>100x100 すごろく</h1>
      <div>
        <button onClick={rollDice}>サイコロを振る</button>
        <p>サイコロの目: {diceRoll}</p>
      </div>

      <div className="board">
        <div
          className="player"
          style={{
            top: `${playerPosition.y * 10}px`,
            left: `${playerPosition.x * 10}px`,
          }}
        ></div>
        {[...Array(gridSize)].map((_, y) =>
          [...Array(gridSize)].map((_, x) => (
            <div
              key={`${x}-${y}`}
              className="cell"
              style={{
                width: '10px',
                height: '10px',
                border: '1px solid lightgray',
                position: 'absolute',
                top: `${y * 10}px`,
                left: `${x * 10}px`,
              }}
            />
          ))
        )}

        {isMoving && (
          <div className="arrows">
            <span
              onClick={() => movePlayer('up')}
              className="arrow up"
            >
              ↑
            </span>
            <span
              onClick={() => movePlayer('down')}
              className="arrow down"
            >
              ↓
            </span>
            <span
              onClick={() => movePlayer('left')}
              className="arrow left"
            >
              ←
            </span>
            <span
              onClick={() => movePlayer('right')}
              className="arrow right"
            >
              →
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
