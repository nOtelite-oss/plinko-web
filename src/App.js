import React, { useState } from 'react';

import './App.css';

import ResultRepresentation from './components/ResultRepresentation/ResultRepresentation';
import { Test } from './components/Test';
import ValueForm from './components/ValueForm/ValueForm.js';

function App() {
  const [boxCount, changeBoxCount] = useState();
  const [ballCount, changeBallCount] = useState();

  const FormValueHandler = (props) => {
    changeBoxCount(props[0]);
    changeBallCount(props[1]);
  };

  return (
    <div>
      <ValueForm getValues={FormValueHandler} />
      <ResultRepresentation ballCount={ballCount} boxCount={boxCount} />
      <Test />
    </div>
  );
}

export default App;
