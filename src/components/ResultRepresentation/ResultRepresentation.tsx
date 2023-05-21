import React from 'react';
import Simulation, { SimulationType } from './Simulation';

const ResultRepresentation = (props: SimulationType) => {
  return (
    <div>
      <Simulation {...props} />
    </div>
  );
};

export default ResultRepresentation;
