import React, { useEffect, useState } from "react";
import s from "./MyNotes.module.scss";
import Note from "../Note";
import axios from "axios";
const MyNotes = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const { data } = await axios.get("/api/notes");
    setNotes(data);
    console.log(data);
  };
  useEffect(() => {
    console.log("hiiii");
    fetchNotes();
  }, []);
  return (
    <div className={s.mainContainer}>
      {notes.map((value) => {
        return (
          <Note title={value.title} content={value.content} key={value._id} />
        );
      })}
    </div>
  );
};

export default MyNotes;
