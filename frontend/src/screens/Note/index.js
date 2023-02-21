import React from "react";
import { useNavigate } from "react-router-dom";
import s from "./Note.module.scss";
const Note = (props) => {
  const history = useNavigate();
  const { title, content, value } = props;
  const onClickHandlerNote = () => {
    history(`/note/${value._id}`);
  };
  return (
    <div className={s.mainContainer}>
      <div className={s.noteWrapper}>
        <div className={s.notebook}>
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
        </div>
      </div>
    </div>
  );
};

export default Note;
