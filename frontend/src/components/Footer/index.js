import React from "react";
import { BsFillHeartFill } from "react-icons/bs";
import s from "./Footer.module.scss";
const Footer = () => {
  return (
    <div className={s.footer}>
      <span>Made with &nbsp;</span>
      <BsFillHeartFill />
      <span>&nbsp; by &nbsp;</span>
      <a href='https://github.com/Priyanshii677'>Priyanshii677</a>
    </div>
  );
};

export default Footer;
