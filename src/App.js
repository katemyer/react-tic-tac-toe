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
  const [currentWinner, setCurrentWinner] = useState(null);

  // Wave 2
  // You will need to create a method to change the square 
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const onClickCallback = (id) => {
    //check if a winner is set
    if (currentWinner !== null){
      //if there is a winner, break therefore do not update squares
      return;
    }
    // id is the id of the square that is being updated
    // find the id in squares
    //id = 8 = squares[2][2].id
    //console.log(id)
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
          // after updating board, check for win
          console.log(checkForWinner())
          //then check is board is filled
          console.log(`is filled ${isSquaresFilled()}`)
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
    //check for row winners, example = 'ooo'
    //loop through each row
    let winner = null
    for (let row = 0; row < squares.length; row += 1){
      //check if each column in this row equals one another
      if (squares[row][0].value === squares[row][1].value && squares[row][0].value === squares[row][2].value && squares[row][0].value !== ''){
        //if true, winner based on value, ex: x
        winner = squares[row][2].value;
        //update squares = set and refresh page and checking for winner
        setCurrentWinner(winner)
        //stop evaluating other combinations, return winner
        return winner 
      }
    }
    //check column winners
    for (let col = 0; col < 3; col += 1) {
      //check if each row in this colum equals one another
        if(squares[0][col].value === squares[1][col].value && squares[0][col].value === squares[2][col].value && squares[0][col].value !== ''){
          //if true, winner based on value
          winner = squares[0][col].value;
          //update squares to set and refresh page to check for winner
          setCurrentWinner(winner)
          return winner
        }
    }
    //check diagonal winner
    if (squares[0][0].value === squares[1][1].value 
      && squares[2][2].value === squares[0][0].value 
      && squares[0][0].value !== ''){
      winner = squares[0][0].value;
      setCurrentWinner(winner)
      return winner
    }
    else if (squares[2][0].value === squares[1][1].value 
      && squares[0][2].value === squares[2][0].value 
      && squares[2][0].value !== ''){
      winner = squares[2][0].value;
      setCurrentWinner(winner)
      return winner
    }
    //check ties
    //if all squares are filled, there are no winners
    if (isSquaresFilled() && winner === null) {
      setCurrentWinner('no winner, tied')
    }
    return winner
  }

  
  const isSquaresFilled = () => {
    let isFilled = true;
    //turn squares array from 2d to 1d:https://stackoverflow.com/questions/14824283/convert-a-2d-javascript-array-to-a-1d-array
    let squaresflat = [].concat(...squares);
    //loop through squares 
    for (let i in squaresflat) {
      let square = squaresflat[i];
       //check if value is ''
       if (square.value === ''){
        //if true, there is a value
        return false;
      }
    }
    return isFilled
  }


  const onClickResetGame = () => {
    // Complete in Wave 4: resetting all states
    // reset setSquares to default generateSquares());
    setSquares(generateSquares())
    //reset setcurrentPlayer to default PLAYER_1
    setCurrentPlayer(PLAYER_1)
    //reset currentWinner
    setCurrentWinner(null)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is {currentWinner} </h2>
        <h3> Current Player {currentPlayer} </h3>
        <button onClick={onClickResetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
}

export default App;
