import React from "react";
import s from "./Note.module.scss";
const Note = (props) => {
  const { title, content, key, value } = props;
  console.log(props, "key");
  return (
    <a className={s.mainContainer} href={`/note/${value._id}`}>
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
    </a>
  );
};

export default Note;
