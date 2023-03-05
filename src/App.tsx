import { useState, useEffect, FC, ReactNode, MouseEvent } from "react";

import { BombCounter, Timer, Button } from "./components/index";

import { createField, unwrapCells } from "./utils";

import { MAX_COLS, MAX_ROWS } from "./constants";

import { Cell, CellState, CellValue, Face } from "./types";

import "./App.scss";
import "./components/Button/Button.scss";

const App: FC = () => {
  const [field, setField] = useState<Cell[][]>(createField());
  const [face, setFace] = useState<Face>(Face.smile);
  const [time, setTime] = useState<number>(0);
  const [bombCounter, setBombCounter] = useState<number>(40);
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

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

  useEffect(() => {
    const gameArea = document.getElementById("gameArea");

    const handleBlockClick = (e: any) => {
      e.stopPropagation();
    };

    if (isGameOver) {
      setIsGameRunning(false);
      setFace(Face.lost);
      gameArea?.addEventListener("click", handleBlockClick);
    } else if (isGameWon) {
      setIsGameRunning(false);
      setFace(Face.won);
      gameArea?.addEventListener("click", handleBlockClick);
    }

    return () => {
      gameArea?.removeEventListener("click", handleBlockClick);
    };
  }, [isGameOver, isGameWon]);

  const handleCellClick = (rowParam: number, colParam: number): void => {
    let visibleField = field.slice();

    if (!isGameRunning) {
      while (field[rowParam][colParam].value === CellValue.bomb) {
        visibleField = createField();
        field[rowParam][colParam] = visibleField[rowParam][colParam];
      }
      setIsGameRunning(true);
    }

    const currentCell = field[rowParam][colParam];

    if ([CellState.flagged, CellState.visible].includes(currentCell.state))
      return;

    if (currentCell.value === CellValue.bomb) {
      setIsGameOver(true);
      visibleField[rowParam][colParam].red = true;
      visibleField = showAllBombs();
      setField(visibleField);
      return;
    } else if (currentCell.value === CellValue.none) {
      visibleField = unwrapCells(visibleField, rowParam, colParam);
    } else {
      visibleField[rowParam][colParam].state = CellState.visible;
      setField(visibleField);
    }

    let safeCellOpened = false;

    for (let row = 0; row < MAX_ROWS; row++) {
      for (let col = 0; col < MAX_COLS; col++) {
        const currentCell = field[row][col];

        if (
          currentCell.value !== CellValue.bomb &&
          currentCell.state === CellState.open
        ) {
          safeCellOpened = true;
          break;
        }
      }
    }

    if (!safeCellOpened) {
      visibleField = visibleField.map((row) =>
        row.map((cell) => {
          if (cell.value === CellValue.bomb) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }
          return cell;
        })
      );
      setIsGameWon(true);
    }

    setField(visibleField);
  };

  const handleFaceClick = (): void => {
    setIsGameRunning(false);
    setIsGameOver(false);
    setIsGameWon(false);
    setTime(0);
    setBombCounter(40);
    setField(createField());
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
        currentFieldCopy[rowParam][colParam].state = CellState.questioned;
        setField(currentFieldCopy);
        setBombCounter(bombCounter + 1);
      } else if (currentCell.state === CellState.questioned) {
        currentFieldCopy[rowParam][colParam].state = CellState.open;
        setField(currentFieldCopy);
      }
    };

  const showAllBombs = (): Cell[][] => {
    const currentField = field.slice();
    return currentField.map((row) =>
      row.map((cell) => {
        if (cell.value === CellValue.bomb) {
          return {
            ...cell,
            state: CellState.visible,
          };
        }
        if (cell.state === CellState.flagged) {
          return {
            ...cell,
            state: CellState.wrong,
          };
        }
        return cell;
      })
    );
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
          red={cell.red}
          handleCellClick={handleCellClick}
          handleCellContextClick={handleCellContextClick}
        />
      ))
    );
  };

  return (
    <div className="App">
      <div className="Header">
        <BombCounter value={bombCounter} />
        <div className={`Head ${face}`} onClick={handleFaceClick}>
          <span role="img" aria-label="face"></span>
        </div>
        <Timer value={time} />
      </div>
      <div className="Body" id="gameArea">
        {renderCells()}
      </div>
    </div>
  );
};

export default App;
