import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./Note.module.scss";
import { motion } from "framer-motion";
const Note = (props) => {
  const history = useNavigate();
  const { title, content, value } = props;
  const onClickHandlerNote = () => {
    // history(`/note/${value._id}`);
    // setOpenModal(true);
  };
  return (
    <div className={s.mainContainer}>
      <div className={s.noteWrapper}>
        <div className={s.notebook}>
          <Link to={`/note/${value._id}`}>
            <div
              className={s.notebookCover}
              style={{ backgroundColor: value.bgColor }}
              onClick={() => {
                onClickHandlerNote();
              }}
            >
              <div className={s.notebookSkin}>
                <div className={s.title}>{title}</div>
              </div>
            </div>
            <div
              className={s.notebookPage}
              onClick={() => {
                onClickHandlerNote();
              }}
            >
              {content}
            </div>
          </Link>
        </div>
      </div>
      {/* {openModal && <Modal />} */}
    </div>
  );
};

export default Note;
