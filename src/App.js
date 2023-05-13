import React, { useState } from 'react';

import './App.css';

import ValueForm from './components/ValueForm/ValueForm.js';
import ResultRepresentation from './components/ResultRepresentation/ResultRepresentation';

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
