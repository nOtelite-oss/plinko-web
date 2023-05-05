import React, { useState } from 'react';

import './App.css';

import ValueForm from './components/ValueForm/ValueForm.js';
import ResultRepresentation from './components/ResultRepresentation/ResultRepresentation';

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
    </div>
  );
}

export default App;
