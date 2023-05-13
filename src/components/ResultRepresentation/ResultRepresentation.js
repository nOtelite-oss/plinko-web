import React from 'react';
import Simulation from './Simulation';

const ResultRepresentation = (props) => {
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
