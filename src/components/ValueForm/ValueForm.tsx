import React, { useState } from 'react';
import classes from './ValueForm.module.css';

interface IValueForm {
  getValues: (a: number, b: number, c: number) => void;
}

const ValueForm = (props: IValueForm) => {
  const [boxNumber, boxNumberChanger] = useState<number>();
  const [ballNumber, ballNumberChanger] = useState<number>();

  const [submitValue, submitValueHandler] = useState<number>(0);

  const boxNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    boxNumberChanger(parseInt(event.target.value) ?? 0);
  };

  const ballNumberHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    ballNumberChanger(parseInt(event.target.value) ?? 0);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!!boxNumber && !!ballNumber) {
      props.getValues(boxNumber, ballNumber, submitValue);
    }
    submitValueHandler(submitValue + 1);
  };

  return (
    <div>
      <h1 className={classes.MainHeader}>Plinko Simulation</h1>
      <form className={classes.MainContainer} onSubmit={submitHandler}>
        <div className={classes.FormContent}>
          <label className={classes.FormLabel} htmlFor="box-input">
            Box Number:
          </label>
          <input
            className={classes.FormInput}
            type="number"
            id="box-input"
            name="box-input"
            placeholder="Ex: 5"
            min={1}
            onChange={boxNumberHandler}
            required
          />
        </div>
        <div className={classes.FormContent}>
          <label className={classes.FormLabel} htmlFor="ball-input">
            Ball Number:
          </label>
          <input
            className={classes.FormInput}
            type="number"
            id="ball-input"
            name="ball-input"
            placeholder="Ex: 1000000"
            onChange={ballNumberHandler}
            required
          />
        </div>
        <div className={(classes.FormContent, classes.Selector)}>
          <label className={classes.FormLabel} htmlFor="solutionWay">
            Sellect Solution Way:{' '}
          </label>
          <select name="solutionWay" id={classes.SelectForm}>
            <option value="GauissianDistrubution">
              Gauissian Distrubution
            </option>
            <option value="FullySimulate">Fully Simulate</option>
          </select>
        </div>
        <div className={classes.FormContent}>
          <button className={classes.SubmitButton} type="submit">
            Simulate
          </button>
        </div>
      </form>
    </div>
  );
};

export default ValueForm;
