import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

// description: generate list of Square Components
// param squares : 2d array
// param onClickCallback : callback function
// returns listofsquares : list of Square Components
const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  //squares is a 2D array
  //create an array
  let listofsquares = []
  //populate rows by looping through rows based on squares.length
  for (let row = 0; row < squares.length; row += 1) {
    //populate colums by looping through columns based on squares
    for (let col = 0; col < squares[0].length; col += 1) {
      //push Square component coming from Square.js into listofsquares array
          //Square comp needs id, value, and onClickCallback
          //set Square components .proptypes bc Square.js requires this
          let id=squares[row][col].id
          let value=squares[row][col].value
      listofsquares.push(<Square id={id} value={value} onClickCallback={onClickCallback}/>)
    }
  }


  //return 
  return listofsquares
}

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
  return <div className="grid" >
    {squareList}
  </div>
}

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  ),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
