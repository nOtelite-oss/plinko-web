import React from 'react';

import classes from './Info.module.css';

const Info = () => {
  return (
    <div className={classes.InfoContainer}>
      <h2 className={classes.InfoMainHeader}>Plinko Simulation</h2>
      <div className={classes.InfoSection}>
        <h3 className={classes.InfoSecondaryHeader}>➦What is Plinko Simulation?</h3>
        <p className={classes.InfoParagraph}>Plinko is a game where you drop certain amount of balls to a few boxes where there are sticks between them. When a ball drops, it have a 50% change of going left or right. This continues until the ball falls to some box.</p>
      </div>
      <div className={classes.InfoSection}>
        <h3 className={classes.InfoSecondaryHeader}>➦About This Page</h3>
        <p className={classes.InfoParagraph}>This page can simulate plinko probability at significant amount of ball counts within seconds.</p> 
      </div>
    </div>
  )
}

export default Info;