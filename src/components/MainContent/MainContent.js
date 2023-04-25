import classes from './MainContent.module.css';

const MainContent = () => {
  return (
    <div>
      <form className={classes.MainContainer}>
        <div className={classes.FormContent}>
          <label for='box-input'>Box Number:</label>
          <input type='number' name='box-input' placeholder='Ex: 5' />
        </div>
        <div className={classes.FormContent}>
          <label for='ball-input'>Ball Input:</label>
          <input type='number' name='ball-input' placeholder='Ex: 1000000' />
        </div>
      </form>
    </div>
  );
};

export default MainContent;
