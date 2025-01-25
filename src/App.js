import React, { useState } from 'react';
import './App.css';

const gridSize = 100;  // ボードのサイズ
const eventSpaces = Array.from({ length: gridSize * gridSize }, (_, i) => i); // 全マスをイベントマスに

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
      if(Math.random()*5<=1){
        const blockX = Math.floor(newX / (gridSize / 4)); // 現在のX位置に基づくブロック
        const blockY = Math.floor(newY / (gridSize / 4)); // 現在のY位置に基づくブロック
        const blockIndex = blockY * 4 + blockX; // 現在のブロックインデックス
        const newCard = `カード${blockIndex * 100 + Math.floor(Math.random() * 100)+100}`; // ブロックごとのカード
        setCards([...cards, newCard]);
        setMessage(`イベントマス！ 新しいカードを手に入れました: ${newCard}`);
      }
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
          backgroundColor: (() => {
            const blockX = Math.floor(x / (gridSize / 4)); // 4分割のXブロック
            const blockY = Math.floor(y / (gridSize / 4)); // 4分割のYブロック
            const blockIndex = blockY * 4 + blockX; // ブロックのインデックス
            const colors = [
              '#ffe4e1', '#ffefd5', '#fafad2', '#e0ffff',
              '#d8bfd8', '#dda0dd', '#e6e6fa', '#b0c4de',
              '#f5deb3', '#deb887', '#f0e68c', '#98fb98',
              '#afeeee', '#add8e6', '#87ceeb', '#ffe4b5'
            ];
            
            return colors[blockIndex % colors.length]; // ブロックごとに異なる色を適用
          })(),
          
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
