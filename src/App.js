import React, { useState } from 'react';

import './App.css';

import ResultRepresentation from './components/ResultRepresentation/ResultRepresentation';
import { Test } from './components/Test';
import ValueForm from './components/ValueForm/ValueForm.js';

function App() {
  const [boxCount, changeBoxCount] = useState();
  const [ballCount, changeBallCount] = useState();
  const [submitValue, submitValueHandler] = useState(0);

  const FormValueHandler = (props) => {
    changeBoxCount(props[0]);
    changeBallCount(props[1]);
    submitValueHandler([props[2]]);
  };

  return (
    <div>
      <ValueForm getValues={FormValueHandler} />
      {ballCount && (
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
