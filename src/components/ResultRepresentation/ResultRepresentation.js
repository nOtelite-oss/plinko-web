import React from 'react';
import Simulation from './Simulation';

const ResultRepresentation = (props) => {
  return (
    <div>
      {props.ballCount && (
        <Simulation ballCount={props.ballCount} boxCount={props.boxCount} />
      )}
    </div>
  );
};

export default ResultRepresentation;
