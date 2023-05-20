import React from 'react';
import Simulation, { SimulationType } from './Simulation';

const ResultRepresentation = (props: SimulationType) => {
  return (
    <div>
      <Simulation
        ballCount={props.ballCount}
        boxCount={props.boxCount}
        submitValue={props.submitValue}
      />
    </div>
  );
};

export default ResultRepresentation;
