import { useState, useEffect, FC, ReactNode } from "react";

import { TimeDisplay } from "./components/TimeDisplay";
import { Button } from "./components/Button";

import { createField } from "./utils";

import { Cell, CellState, Face } from "./types";

import "./App.scss";

const App: FC = () => {
  const [field, setField] = useState<Cell[][]>(createField());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [bombCounter, setBombCounter] = useState<number>(10);

  useEffect(() => {
    const handleKeydown = () => {
      setFace(Face.surprised);
    };

    const handleKeyup = () => {
      setFace(Face.smile);
    };

    window.addEventListener("mousedown", handleKeydown);
    window.addEventListener("mouseup", handleKeyup);

    return () => {
      window.removeEventListener("mousedown", handleKeydown);
      window.removeEventListener("mouseup", handleKeyup);
    };
  }, []);

  useEffect(() => {
    if (isGameRunning && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isGameRunning, time]);

  const handleCellClick = (rowParam: number, colParam: number): void => {
    if (!isGameRunning) {
      setIsGameRunning(true);
    }
  };

  const handleFaceClick = (): void => {
    if (isGameRunning) {
      setIsGameRunning(false);
      setTime(0);
      setField(createField());
    }
  };

  const handleCellContextClick =
    (rowParam: number, colParam: number) =>
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
      e.preventDefault();

      if (!isGameRunning) return;

      const currentCell = field[rowParam][colParam];
      const currentFieldCopy = field.slice();

      if (currentCell.state === CellState.visible) {
        return;
      } else if (currentCell.state === CellState.open) {
        currentFieldCopy[rowParam][colParam].state = CellState.flagged;
        setField(currentFieldCopy);
        setBombCounter(bombCounter - 1);
      } else if (currentCell.state === CellState.flagged) {
        currentFieldCopy[rowParam][colParam].state = CellState.open;
        setField(currentFieldCopy);
        setBombCounter(bombCounter + 1);
      }
    };

  const renderCells = (): ReactNode => {
    return field.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          state={cell.state}
          value={cell.value}
          handleCellClick={handleCellClick}
          handleCellContextClick={handleCellContextClick}
        />
      ))
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <TimeDisplay value={bombCounter} />
        <div className="Head" onClick={handleFaceClick}>
          <span role="img" aria-label="face">
            {face}
          </span>
        </div>
        <TimeDisplay value={time} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
