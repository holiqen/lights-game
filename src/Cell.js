import React from "react";
import "./Cell.css";

const Cell = ({ isLit, flipCellsAroundMe }) => {
  const classes = `Cell ${isLit ? "Cell-lit" : ""}`;

  function handleClick() {
    flipCellsAroundMe();
  }

  return <td className={classes} onClick={handleClick} />;
};

export default Cell;
