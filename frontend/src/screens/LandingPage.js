import React, { useState } from "react";
import s from "./LandingPage.module.scss";
import image1 from "../utils/images/Taking notes-yellow.png";
const LandingPage = () => {
  return (
    <div className={s.mainContainer}>
      <div className={s.leftContainer}>
        <h1 className={s.heading}>
          The most beautiful note-taking app for all your notes.
        </h1>
        <div className={s.buttonContainer}>
          <button>Sign Up</button>
          <button>LogIn</button>
        </div>
      </div>

      <div className={s.rightContainer}>
        <img src={image1} alt='notes'></img>
      </div>
    </div>
  );
};

export default LandingPage;
