import React from "react";
import s from "./MyNotes.module.scss";
import Note from "../Note";
import notes from "../../utils/notes.js";
const MyNotes = () => {
  return (
    <div className={s.mainContainer}>
      {notes.map((value) => {
        return <Note title={value.title} content={value.content} />;
      })}
    </div>
  );
};

export default MyNotes;
