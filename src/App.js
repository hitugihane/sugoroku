import React, { useState } from 'react';
import './App.css';

const gridSize = 100;  // ボードのサイズ
const eventSpaces = []; // イベントマスの配列

// ランダムにイベントマスを配置
for (let i = 0; i < 10; i++) {  // ここで10個のイベントマスを作成
  const randomPosition = Math.floor(Math.random() * gridSize * gridSize);
  eventSpaces.push(randomPosition);
}

const App = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });
  const [diceRoll, setDiceRoll] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [cards, setCards] = useState([]);  // プレイヤーのカードを管理
  const [message, setMessage] = useState("");  // メッセージ表示用

  const rollDice = () => {
    if (isMoving) return;
    const roll = Math.floor(Math.random() * 6) + 1;
    setDiceRoll(roll);
    setIsMoving(true);
    setMessage("");  // サイコロを振るたびにメッセージをリセット
  };

  const movePlayer = (direction) => {
    if (!isMoving) return;

    let newX = playerPosition.x;
    let newY = playerPosition.y;
    let newPosition = playerPosition.x + playerPosition.y * gridSize; // プレイヤーの現在の位置を1Dに変換

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

    // 新しい座標
    newPosition = newX + newY * gridSize;

    // イベントマスに止まったらカードをゲット
    if (eventSpaces.includes(newPosition)) {
      const newCard = `カード${Math.floor(Math.random() * 1000)}`;
      setCards([...cards, newCard]);
      setMessage(`イベントマス！ 新しいカードを手に入れました: ${newCard}`);
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
        <p>{message}</p>
        <div>
          <h3>手に入れたカード:</h3>
          <ul>
            {cards.map((card, index) => (
              <li key={index}>{card}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="board">
        <div
          className="player"
          style={{
            top: `${playerPosition.y * 10}px`,   // y軸
            left: `${playerPosition.x * 10}px`,  // x軸
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
                backgroundColor: eventSpaces.includes(x + y * gridSize) ? 'yellow' : 'white',  // イベントマスを黄色に
              }}
            />
          ))
        )}

        {isMoving && (
          <div className="arrows">
            <span onClick={() => movePlayer('up')} className="arrow up">↑</span>
            <span onClick={() => movePlayer('down')} className="arrow down">↓</span>
            <span onClick={() => movePlayer('left')} className="arrow left">←</span>
            <span onClick={() => movePlayer('right')} className="arrow right">→</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
