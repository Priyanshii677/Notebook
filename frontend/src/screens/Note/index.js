import React from "react";
import s from "./Note.module.scss";
const Note = (props) => {
  const { title, content } = props;
  return (
    <div className={s.mainContainer}>
      <div className={s.noteWrapper}>
        <div className={s.notebook}>
          <div className={s.notebookCover}>
            <div className={s.notebookSkin}>
              <div className={s.title}>{title}</div>
            </div>
          </div>
          <div className={s.notebookPage}>{content}</div>
        </div>
      </div>
    </div>
  );
};

export default Note;
