import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

const Board = ({ ncols = 5, nrows = 5, chanceLightStartsOn = 0.25 }) => {
  const [won, setWon] = useState(false);
  const [board, setBoard] = useState(createBoard(ncols, nrows, chanceLightStartsOn));

  function createBoard(ncols, nrows, chanceLightStartsOn) {
    const newBoard = [];
    for (let y = 0; y < nrows; y++) {
      const row = [];
      for (let x = 0; x < ncols; x++) {
        row.push(Math.random() < chanceLightStartsOn);
      }
      newBoard.push(row);
    }
    return newBoard;
  }

  function createTableBoard(ncols, nrows, board) {
    const tableBoard = [];
    for (let y = 0; y < nrows; y++) {
      const row = [];
      for (let x = 0; x < ncols; x++) {
        const coordinate = `${y}-${x}`;
        row.push(
          <Cell
            key={coordinate}
            isLit={board[y][x]}
            flipCellsAroundMe={() => flipCellsAround(coordinate, ncols, nrows, board)}
          />
        );
      }
      tableBoard.push(<tr key={y}>{row}</tr>);
    }
    return tableBoard;
  }

  function flipCellsAround(coordinate, ncols, nrows, board) {
    const [y, x] = coordinate.split("-").map(Number);
    const newBoard = board;

    function flipCell(y, x) {
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);
    flipCell(y - 1, x);
    flipCell(y + 1, x);

    const hasWon = newBoard.every((row) => row.every((cell) => !cell));

    setBoard([...newBoard]);
    setWon(hasWon);
  }

  /** Render game board or winning message. */

  if (won) {
    return (
      <div className="Board-title">
        <div className="winner">
          <span className="neon-orange">YOU</span>
          <span className="neon-blue">WIN!</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="Board-title">
        <div className="neon-orange">Lights</div>
        <div className="neon-blue">Game</div>
      </div>
      <table className="Board">
        <tbody>{createTableBoard(ncols, nrows, board)}</tbody>
      </table>
    </div>
  );
};

export default Board;
