import React from 'react';
import classes from './GraphValues.module.css';
import { TO_FIXED_VAL } from './Simulation';

interface IGraphValues {
  index: number;
  sumBoxes: number[];
  idealResult: number[];
  sumDeflection: number[];
  valueIndicatorColor: string;
}

const GraphValues = (props: IGraphValues) => {
  const valueChange =
    props.sumBoxes[props.index] - props.idealResult[props.index];

  const valueDisplay =
    valueChange === 0 ? '' : valueChange.toFixed(TO_FIXED_VAL);

  const deflection =
    props.sumDeflection[props.index] > 1
      ? props.sumDeflection[props.index].toFixed(1) + '%'
      : props.sumDeflection[props.index].toFixed(4) + '%';

  return (
    <div className={classes.GraphOuterDiv}>
      <div className={classes.GraphInnerDiv}>
        <p className={classes.GraphParagraph}>{props.sumBoxes[props.index]}</p>
      </div>
      <div className={classes.GraphInnerDiv}>
        <div className={classes.SumValueDiv}>
          <p className={classes.GraphParagraph}>
            {props.idealResult[props.index]}
          </p>

          <p
            style={{ color: props.valueIndicatorColor }}
            className={classes.GraphParagraph}
          >
            {valueDisplay}
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
