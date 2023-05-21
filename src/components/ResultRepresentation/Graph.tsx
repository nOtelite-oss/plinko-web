import React from 'react';
import classes from './Graph.module.css';
import GraphExplanation from './GraphExplanation';
import GraphValues from './GraphValues';

type GraphType = {
  sumBoxes: number[];
  pascalTotal: number;
  idealResult: number[];
  sumDeflection: number[];
  averageDeflection: number;
};

const Graph = (props: GraphType) => {
  const resultMapper = (item: number, index: number) => {
    let maxItem = Math.max(...props.sumBoxes);
    let itemHeight = (100 * item) / maxItem;

    const valueIndicatorColor =
      item - props.idealResult[index] > 0
        ? 'green'
        : item - props.idealResult[index] < 0
        ? 'red'
        : '';

    return (
      <div
        className={classes.MapItems}
        style={{ height: '100%', width: '100%' }}
        key={index}
      >
        <div className={classes.Outer}>
          <div
            className={classes.Fill}
            style={{
              height: itemHeight + '%',
            }}
          />
        </div>

        {props.sumBoxes.length < 20 && (
          <GraphValues
            index={index}
            sumBoxes={props.sumBoxes}
            idealResult={props.idealResult}
            sumDeflection={props.sumDeflection}
            valueIndicatorColor={valueIndicatorColor}
          />
        )}
      </div>
    );
  };

  const graphWidth =
    props.sumBoxes.length <= 12
      ? props.sumBoxes.length * 7 + 'rem'
      : 84 + 'rem';

  return (
    <div className={classes.Container} style={{ width: graphWidth }}>
      {props.sumBoxes.length < 20 && <GraphExplanation />}
      <div className={classes.ResultMap}>
        <div className={classes.GraphContainer}>
          {props.sumBoxes.map(resultMapper)}
        </div>
        <div id={classes.AvarageDeflection}>{props.averageDeflection}%</div>
      </div>
    </div>
  );
};

export default Graph;
