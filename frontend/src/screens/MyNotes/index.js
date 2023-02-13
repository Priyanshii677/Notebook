import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import s from "./MyNotes.module.scss";
import Note from "../Note";
import axios from "axios";
import { listNotes } from "../../actions/notesActions";
const MyNotes = () => {
  // const [notes, setNotes] = useState([]);
  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const [loading, notes, error] = noteList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      // dispatch(deleteNoteAction(id));
    }
  };

  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   setNotes(data);
  //   console.log(data);
  // };
  const history = useNavigate();

  useEffect(() => {
    console.log("hiiii");
    // fetchNotes();
    dispatch(listNotes());
    if (!userInfo) {
      history.push("/");
    }
  }, [dispatch, successCreate, history, userInfo]);
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
