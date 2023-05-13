import React, { useState } from 'react';
import classes from './ValueForm.module.css';

const ValueForm = (props) => {
  const [boxNumber, boxNumberChanger] = useState();
  const [ballNumber, ballNumberChanger] = useState();

  const [submitValue, submitValueHandler] = useState(0);

  const boxNumberHandler = (event) => {
    boxNumberChanger(event.target.value);
  };

  const ballNumberHandler = (event) => {
    ballNumberChanger(event.target.value);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.getValues([boxNumber, ballNumber, submitValue]);
    submitValueHandler(submitValue + 1);
  };

  return (
    <div>
      <h1 className={classes.MainHeader}>Plinko Simulation</h1>
      <form className={classes.MainContainer} onSubmit={submitHandler}>
        <div className={classes.FormContent}>
          <label className={classes.FormLabel} htmlFor='box-input'>
            Box Number:
          </label>
          <input
            className={classes.FormInput}
            type='number'
            id='box-input'
            name='box-input'
            placeholder='Ex: 5'
            min={1}
            max={29}
            onChange={boxNumberHandler}
            required
          />
        </div>
        <div className={classes.FormContent}>
          <label className={classes.FormLabel} htmlFor='ball-input'>
            Ball Number:
          </label>
          <input
            className={classes.FormInput}
            type='number'
            id='ball-input'
            name='ball-input'
            placeholder='Ex: 1000000'
            onChange={ballNumberHandler}
            required
          />
        </div>
        <div className={classes.FormContent}>
          <button className={classes.SubmitButton} type='submit'>
            Simulate
          </button>
        </div>
      </form>
    </div>
  );
};

export default ValueForm;
