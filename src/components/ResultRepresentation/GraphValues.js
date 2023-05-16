import React from 'react';
import classes from './GraphValues.module.css';

const GraphValues = (props) => {
  let valueChange =
    props.sumBoxes[props.index] - props.idealResult[props.index];

  if (valueChange === 0) {
    valueChange = '';
  }

  const deflection =
    props.sumDeflection[props.index] > 1
      ? props.sumDeflection[props.index].toFixed(1) + '%'
      : props.sumDeflection[props.index].toFixed(4) + '%';

  return (
    <div className={classes.GraphOuterDiv}>
      <div className={classes.GraphInnerDiv}>
        <p className={classes.GraphParagraph}>{props.sumBoxes[props.index]}</p>{' '}
      </div>
      <div className={classes.GraphInnerDiv}>
        <div className={classes.SumValueDiv}>
          <p className={classes.GraphParagraph}>
            {' '}
            {props.idealResult[props.index]}
          </p>

          <p
            style={{ color: props.valueIndicatorColor }}
            className={classes.GraphParagraph}
          >
            {valueChange}
          </p>
        </div>
      </div>
      <div className={classes.GraphInnerDiv}>
        <p className={classes.GraphParagraph}>{deflection}</p>
      </div>
    </div>
  );
};

export default GraphValues;
