import React, { useState, useEffect ,useRef } from 'react';

import './App.css';

import ValueForm from './components/ValueForm/ValueForm';

import Simulation from './components/ResultRepresentation/Simulation';

function App() {
  const [boxCount, changeBoxCount] = useState<number>(0);
  const [ballCount, changeBallCount] = useState<number>(0);
  const [submitValue, submitValueHandler] = useState<number>(0);

  const deflection = useRef<number>(10000)
  useEffect(()=>{
    deflection.current = 10000;
  },[boxCount,ballCount])

  const FormValueHandler = (
    boxNumber: number,
    ballNumber: number,
    submitValue: number
  ) => {
    changeBoxCount(boxNumber);
    changeBallCount(ballNumber);
    submitValueHandler(submitValue);
  };

  const getDeflection = (sumDeflection : number) => {
    if(sumDeflection !== 0) {
      if(sumDeflection >= deflection.current) {
        setTimeout(()=>{submitValueHandler(submitValue + 1)},200)
      }
      else {
        deflection.current = sumDeflection;
        console.log(sumDeflection)
      }
    }
  }


  return (
    <div>
      <ValueForm getValues={FormValueHandler} />
      {!!ballCount && (
        <Simulation
          ballCount={ballCount}
          boxCount={boxCount}
          submitValue={submitValue}
          getDeflection={getDeflection}
        />
      )}
    </div>
  );
}

export default App;
