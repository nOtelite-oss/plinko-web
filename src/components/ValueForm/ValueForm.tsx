import React, { useState } from 'react';
import classes from './ValueForm.module.css';

interface IValueForm {
  getValues: (a: number, b: number, c: number, d: 0 | 1) => void;
}

const ValueForm = (props: IValueForm) => {
  const [boxNumber, boxNumberChanger] = useState<number>();
  const [ballNumber, ballNumberChanger] = useState<number>();
  const [simType, setSimType] = useState<0|1>(1)
  const [submitValue, submitValueHandler] = useState<number>(0);

  const boxNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    boxNumberChanger(parseInt(event.target.value) ?? 0);
  };

  const ballNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    ballNumberChanger(parseInt(event.target.value) ?? 0);
  };

  const simTypeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if(event.target.value === 'FullySimulate') {
      setSimType(0)
    } else {
      setSimType(1)
    }
  }
    
  // const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!boxNumber && !!ballNumber) {
      props.getValues(boxNumber, ballNumber, submitValue, simType);
    }
    submitValueHandler(submitValue + 1);
  };

  return (
    <div>
      <form className={classes.MainContainer} onSubmit={submitHandler}>
        <div className={classes.FormContent}>
          <label className={classes.FormLabel} htmlFor='box-input'>
            BOX NUMBER:
          </label>
          <input
            className={classes.FormInput}
            type='number'
            id='box-input'
            placeholder='Ex: 5'
            min={1}
            onChange={boxNumberHandler}
            required
          />
        </div>
        <div className={classes.FormContent}>
          <label className={classes.FormLabel} htmlFor='ball-input'>
            BALL NUMBER:
          </label>
          <input
            className={classes.FormInput}
            type='number'
            id='ball-input'
            placeholder='Ex: 1000000'
            onChange={ballNumberHandler}
            min={1}
            required
          />
        </div>
        <div className={(classes.FormContent, classes.Selector)}>
          <label className={classes.FormLabel} htmlFor={classes.SelectForm}>
            SELLECT SOLLUTION WAY:
          </label>
          <select id={classes.SelectForm} onChange={simTypeHandler}>
            <option value='GauissianDistrubution'>
              Gauissian Distrubution
            </option>
            <option value='FullySimulate'>Fully Simulate</option>
          </select>
        </div>
        <div className={classes.FormContent} id={classes.FormButtonDiv}>
          <button className={classes.SubmitButton} type='submit'>
            Simulate
          </button>
        </div>
      </form>
    </div>
  );
};

export default ValueForm;
