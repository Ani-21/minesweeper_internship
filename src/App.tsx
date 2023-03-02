import { useState, FC, ReactNode } from "react";

import { TimeDisplay } from "./components/TimeDisplay";
import { Button } from "./components/Button";

import { createField } from "./utils";

import "./App.scss";

const App: FC = () => {
  const [field, setField] = useState(createField());
  console.log(field);

  const renderCells = (): ReactNode => {
    return field.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          key={`${rowIndex}-${colIndex}`}
          row={rowIndex}
          col={colIndex}
          state={cell.state}
          value={cell.value}
        />
      ))
    );
  };
  return (
    <div className="App">
      <div className="Header">
        <TimeDisplay value={40} />
        <div className="Head">
          <span role="img" aria-label="face">
            😁
          </span>
        </div>
        <TimeDisplay value={10} />
      </div>
      <div className="Body">{renderCells()}</div>
    </div>
  );
};

export default App;
