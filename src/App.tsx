import React, { useState, useEffect, useRef } from "react";

import classes from "./App.module.css";

import ValueForm from "./components/ValueForm/ValueForm";
import Simulation from "./components/ResultRepresentation/Simulation";
import Info from "./components/Info/Info";
import NavBar from "./components/NavBar";

function App() {
  const [boxCount, setBoxCount] = useState<number>(0);
  const [ballCount, setBallCount] = useState<number>(0);
  const [submitValue, submitValueHandler] = useState<number>(0);
  const [simType, setSimType] = useState<0 | 1>(1);

  const deflection = useRef<number>(10000);

  useEffect(() => {
    deflection.current = 10000;
  }, [boxCount, ballCount]);

  const FormValueHandler = (
    boxNumber: number,
    ballNumber: number,
    submitValue: number,
    simType: 0 | 1
  ) => {
    setBoxCount(boxNumber);
    setBallCount(ballNumber);
    submitValueHandler(submitValue);
    setSimType(simType);
  };

  const getDeflection = (sumDeflection: number) => {
    // if (sumDeflection >= deflection.current) {
    //   setTimeout(() => {
    //     submitValueHandler(submitValue + 1);
    //   }, 1000);
    //   console.log("here call submit again state");
    // } else {
    //   deflection.current = sumDeflection;
    //   console.log(sumDeflection, " new deflection useRef");
    // }
    console.log(sumDeflection);
  };

  return (
    <div className={classes.AppContainer}>
      <NavBar />
      <ValueForm getValues={FormValueHandler} />
      {!!ballCount && (
        <Simulation
          ballCount={ballCount}
          boxCount={boxCount}
          simType={simType}
          submitValue={submitValue}
          getDeflection={getDeflection}
          lastDeflection={deflection.current}
        />
      )}
      <Info />
    </div>
  );
}

export default App;
