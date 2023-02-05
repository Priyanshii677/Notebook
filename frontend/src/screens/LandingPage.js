import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import s from "./LandingPage.module.scss";
import { Link } from "react-router-dom";
import image1 from "../utils/images/Taking notes-yellow.png";
const LandingPage = ({ history }) => {
  return (
    <div className={s.mainContainer}>
      <div className={s.leftContainer}>
        <h1 className={s.heading}>
          The most beautiful note-taking app for all your notes.
        </h1>
        <div className={s.buttonContainer}>
          <Link to='/access'>
            <Button size='lg' className={s.accessButton}>
              Access your notes here
            </Button>
          </Link>{" "}
        </div>
      </div>

      <div className={s.rightContainer}>
        <img src={image1} alt='notes'></img>
      </div>
    </div>
  );
};

export default LandingPage;
