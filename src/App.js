import logo from './logo.svg';
// import './App.css';
// import { use, useState } from 'react';

// function App() {
//   const[player,setPlayer]=useState(0);
//    let status=`Player ${player}`

//   return (

//     <div className="game-board" onClick={e=> {setPlayer((player+1)%2);
//                                               e.target.style.background='pink';
//                                               e.target.style.width=400}}>

//         <button onClick={()=>alert('clicked')}>button 1</button>
//         <button onClick={()=>alert('clicked')}>button 2</button>
//         <button onClick={()=>alert('button clicked')}>button 3</button>
//      <div className='grid-row'>
//       <h1>{status}</h1>
//        </div>
//       </div>



//   );
// }

// export default App;




// function Square({ id,player }) { 
//   const[color,setColor] =useState
//   return (
//     <button onClick={(e)=>{alert(`I am ${player}`)}}></button>
//   );
// }

// export default function App() {
//   const[player,setPlayer]=useState(0);
//   let status=`Player ${player}`;


//   function rendersquare(i) {
//     return <Square key={i} player={player} />;
//   }

//   function render() {

//   }

//   return (
//     <div
//       className="game-board"
//       onClick={e=> {
//         setPlayer((player+1)%2);
//         status=`Player${player}`;
//       }}
//     >
//       <div className='grid-row'>
//         {rendersquare(0)}
//         {rendersquare(1)}
//         {rendersquare(2)}
//       </div>

//       <div>
//         <h1>{status}</h1>
//       </div>
//     </div>
//   );
// }



// MOUNT UNMOUNT

// function Square({ id, player }) {
//     const [color, setColor] = useState('red');
//     let palet = ['green', 'yellow', 'pink'];
//     const getrandomcolor = () => {
//         return palet[Math.floor(Math.random() * 3)];
//     };
//     return (
//         <button
//             onClick={(e) => {
//                 setColor(getrandomcolor());
//                 e.target.style.background = color;
//             }}
//         ></button>
//     );
// }

// export default function App() {
//     const [player, setPlayer] = useState(0);
//     const [mount, setMount] = useState(true)

//     let status = `Player ${player}`;

//     function rendersquare(id) {
//         return <Square id={id} player={player}></Square>;
//     }

//     function toggle() {
//         setMount(!mount)
//     }
//     return (
//         <div
//             className='game-board'
//             onClick={(e) => {
//                 setPlayer((player + 1) % 2);
//                 status = `Player ${player}`;
//             }}
//         >
//             <div className='grid-row'>
//                 {mount && rendersquare(0)}
//                 {mount && rendersquare(1)}
//                 {mount && rendersquare(2)}
//             </div>
//             <div>
//                 <h1>{status}</h1>
//                 <button onClick={toggle}>Show/Hide</button>
//             </div>
//         </div>
//     );
// }


// NEXT NOTE 2

// import {useState} from 'react';
// import './App.css';


// function Square({ id, player, onPlay }) {
//   const [status, setStatus] = useState(null);
//   const xo = ["X", "O"];

//   function handleClick() {
//     if (status !== null) return; // prevent re-click
//     setStatus(player);           // store CURRENT player
//     onPlay();                    // tell parent to switch player
//   }

//   return (
//     <button onClick={handleClick}>
//       <h1>{xo[status]}</h1>
//     </button>
//   );
// }
// export default function App() {
//   const [player, setPlayer] = useState(0);

//   function changePlayer() {
//     setPlayer((player + 1) % 2);
//   }

//   function renderSquare(id) {
//     return <Square id={id} player={player} onPlay={changePlayer} />;
//   }

//   let playerTurn = `Next Player is ${player === 0 ? "Player X" : "Player O"}`;

//   return (
//     <div className="game-board">
//       <div className="grid-row">
//         {renderSquare(0)}
//         {renderSquare(1)}
//         {renderSquare(2)}
//       </div>
//       <div className="grid-row">
//         {renderSquare(3)}
//         {renderSquare(4)}
//         {renderSquare(5)}
//       </div>
//       <div className="grid-row">
//         {renderSquare(6)}
//         {renderSquare(7)}
//         {renderSquare(8)}
//       </div>
//       <h1>{playerTurn}</h1>
//     </div>
//   );
// }



//FINAL CODE TIC TAC TOE

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import "./App.css";

function Square({ value, onClick }) {
  return (
    <button className="block" onClick={onClick}>
      <h1>{value}</h1>
    </button>
  );
}

// Winner checking function
function checkWinner(squares) {
  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < win.length; i++) {
    const [a, b, c] = win[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}

export default function App() {
  const [player, setPlayer] = useState(0); // 0 = X, 1 = O
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [showPopup, setShowPopup] = useState(false);

  const xo = ["X", "O"];
  const winner = checkWinner(squares);
  const isDraw = !winner && squares.every((square) => square !== null);

  function handleClick(index) {
    if (squares[index] || winner || isDraw) return;

    const newSquares = squares.slice();
    newSquares[index] = xo[player];
    setSquares(newSquares);
    setPlayer((player + 1) % 2);
  }

  function resetGame() {
    setSquares(Array(9).fill(null));
    setPlayer(0);
    setShowPopup(false);
  }

  // 🎉 Confetti Blast Function
  function fireConfetti() {
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.6 },
    });
  }

  // 👇 When someone wins
  useEffect(() => {
    if (winner) {
      setShowPopup(true);
      fireConfetti();

      // Auto reset after 3 seconds
      setTimeout(() => {
        resetGame();
      }, 3000);
    }
  }, [winner]);

  return (
    <div className="game-board">
      <div className="grid-row">
        <Square value={squares[0]} onClick={() => handleClick(0)} />
        <Square value={squares[1]} onClick={() => handleClick(1)} />
        <Square value={squares[2]} onClick={() => handleClick(2)} />
      </div>

      <div className="grid-row">
        <Square value={squares[3]} onClick={() => handleClick(3)} />
        <Square value={squares[4]} onClick={() => handleClick(4)} />
        <Square value={squares[5]} onClick={() => handleClick(5)} />
      </div>

      <div className="grid-row">
        <Square value={squares[6]} onClick={() => handleClick(6)} />
        <Square value={squares[7]} onClick={() => handleClick(7)} />
        <Square value={squares[8]} onClick={() => handleClick(8)} />
      </div>

      <h1>
        {winner
          ? `Winner is Player ${winner} 😎`
          : isDraw
          ? "Game Draw 🥲"
          : `Next Player 👉 ${xo[player]}`}
      </h1>

      <button onClick={resetGame} className="reset">
        Reset Game
      </button>

      {/* 🎉 Winner Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>🎉 Player {winner} Wins! 🎉</h2>
          </div>
        </div>
      )}
    </div>
  );
}
