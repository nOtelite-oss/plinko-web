import React from 'react';

import GraphValues from './GraphValues';
import classes from './Graph.module.css';

const Graph = (props) => {
  const resultMapper = (item, index) => {
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

        <GraphValues
          index={index}
          sumBoxes={props.sumBoxes}
          idealResult={props.idealResult}
          sumDeflection={props.sumDeflection}
          valueIndicatorColor={valueIndicatorColor}
        />
      </div>
    );
  };

  const graphWidth =
    props.sumBoxes.length <= 10
      ? props.sumBoxes.length * 4 + 'rem'
      : 70 + 'rem';

  return (
    <div className={classes.Container} style={{ width: '500px' }}>
      <div className={classes.ResultMap}>
        <div className={classes.GraphContainer}>
          {props.sumBoxes.map(resultMapper)}
        </div>
        <div id={classes.AvarageDeflection}>{props.avarageDeflection}%</div>
      </div>
    </div>
  );
};

export default Graph;
