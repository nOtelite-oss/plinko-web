import React, { useState } from 'react';

import './App.css';

import ResultRepresentation from './components/ResultRepresentation/ResultRepresentation';
import ValueForm from './components/ValueForm/ValueForm';

function App() {
  const [boxCount, changeBoxCount] = useState<number>(0);
  const [ballCount, changeBallCount] = useState<number>(0);
  const [submitValue, submitValueHandler] = useState<number>(0);

  const FormValueHandler = (
    boxNumber: number,
    ballNumber: number,
    submitValue: number
  ) => {
    changeBoxCount(boxNumber);
    changeBallCount(ballNumber);
    submitValueHandler(submitValue);
  };

  return (
    <div>
      <ValueForm getValues={FormValueHandler} />
      {!!ballCount && (
        <ResultRepresentation
          ballCount={ballCount}
          boxCount={boxCount}
          submitValue={submitValue}
        />
      )}
    </div>
  );
}

export default App;
