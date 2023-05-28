import React, { ReactElement } from 'react';

import classes from './IdealResultIndicator.module.css';

type IndicatorProps = {
  graphWidth: number;
  sumBoxes: number[];
  boxDropPossibilitys: number[];
  index: number;
};

const IdealResultIndicator = (props: IndicatorProps): ReactElement => {
  let maxItem = Math.max(...props.boxDropPossibilitys);
  let itemHeight = (100 * props.boxDropPossibilitys[props.index]) / maxItem;
  return (
    <div
      className={classes.IdealResDivOuter}
      style={{ width: (props.graphWidth - 8) / props.sumBoxes.length + 'rem' }}
    >
      <div
        className={classes.IdealResDivInner}
        style={{ height: itemHeight + '%' }}
      />
    </div>
  );
};

export default IdealResultIndicator;
