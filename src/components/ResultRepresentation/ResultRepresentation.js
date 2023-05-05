import React from 'react';
import PlinkoSim from './PlinkoSim';

const ResultRepresentation = (props) => {
  return (
    <div>
      {props.ballCount && (
        <PlinkoSim ballCount={props.ballCount} boxCount={props.boxCount} />
      )}
    </div>
  );
};

export default ResultRepresentation;
