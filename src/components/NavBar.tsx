import React from "react";

import classes from "./NavBar.module.css";

const NavBar = () => {
  return (
    <div className={classes.NavBarConteiner}>
      <div className={classes.InnerNavBar}>
        <div className={classes.PRapher}>
          <p className={classes.NavBarText} style={{ fontWeight: "800" }}>
            ../
          </p>
        </div>
        <div className={classes.PRapher}>
          <p className={classes.NavBarText}>PLINKO SIMULATION</p>
        </div>
      </div>
      <div className={classes.InnerNavBar}>
        <div className={classes.PRapher}>
          <p className={classes.NavBarText}>Emir Topaloglu</p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
