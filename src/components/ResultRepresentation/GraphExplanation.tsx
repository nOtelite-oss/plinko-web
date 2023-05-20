import React from 'react';
import classes from './GraphExplanation.module.css';

const GraphExplanation = () => {
  return (
    <div className={classes.ExpDiv}>
      <p className={classes.ExpParagraph}>Sim. Results:</p>
      <p className={classes.ExpParagraph}>Ideal Result:</p>
      <p className={classes.ExpParagraph}>Deflection:</p>
      <p className={classes.ExpParagraph}>Avg. Deflection:</p>
    </div>
  );
};

export default GraphExplanation;
