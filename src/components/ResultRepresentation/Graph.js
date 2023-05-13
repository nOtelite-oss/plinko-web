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
      <div style={{ height: '100%', width: '100%' }} key={Math.random()}>
        <div className={classes.Outer}>
          <div
            className={classes.Fill}
            style={{
              height: itemHeight + '%',
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className={classes.Container}
      style={{
        width:
          props.sumBoxes.length < 5 ? props.sumBoxes.length * 10 : 60 + 'rem',
      }}
    >
      {props.sumBoxes.map(resultMapper)}
    </div>
  );
};

export default Graph;
