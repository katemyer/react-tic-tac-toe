import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
}

const App = () => {
  //useState here when need to impact the UI and to re-render
  //https://github.com/Ada-Developers-Academy/textbook-curriculum/blob/master/React/events.md
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  
  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback


  const onClickCallback = (id) => {
    // id is the id of the square that is being updated
    // find the id in squares
    //id = 8 = squares[2][2].id
    console.log(id)

    // https://stackoverflow.com/questions/42037369/how-to-edit-an-item-in-a-state-array
    const copySquares = squares.slice()
    for (let row = 0; row < copySquares.length; row += 1) {
      for (let col = 0; col < copySquares[0].length; col += 1) {
        let currentId=copySquares[row][col].id
        //check if ids match
        if (id === currentId) {
          //check if value is not empty, prevent being overriden
          if (copySquares[row][col].value !== '') return;
          // update the value of the square to currentPlayer
          copySquares[row][col].value = currentPlayer
          // update squares = set and refresh page
          setSquares(copySquares)

          // set to next player
          if (currentPlayer===PLAYER_1) {
            setCurrentPlayer(PLAYER_2)
          }
          else {
            setCurrentPlayer(PLAYER_1)
          }
          return;
        }
      }
    }
  };

  const checkForWinner = () => {
    // Complete in Wave 3

  }

  const onClickResetGame = () => {
    // Complete in Wave 4: resetting all states
    // reset setSquares to default generateSquares());
    setSquares(generateSquares())
    //reset setcurrentPlayer to default PLAYER_1
    setCurrentPlayer(PLAYER_1)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <h3> current player {currentPlayer} </h3>
        <button onClick={onClickResetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
}

export default App;
