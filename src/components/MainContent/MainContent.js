import classes from './MainContent.module.css';

const MainContent = () => {
  return (
    <div>
      <h1 className={classes.MainHeader}>Plinko Simulation</h1>
      <form className={classes.MainContainer}>
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
          />
        </div>
        <div className={classes.FormContent}>
          <label className={classes.FormLabel} htmlFor='ball-input'>
            Ball Input:
          </label>
          <input
            className={classes.FormInput}
            type='number'
            id='ball-input'
            name='ball-input'
            placeholder='Ex: 1000000'
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

export default MainContent;
