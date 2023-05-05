import React from 'react';
import ResultBar from './ResultBar';
import classes from './ResultGraph.module.css';

const ResultGraph = () => {
  return (
    <div className={classes.ResultBarContainer}>
      <ResultBar />
    </div>
  );
};

export default ResultGraph;
