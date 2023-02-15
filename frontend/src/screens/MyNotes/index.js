import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import s from "./MyNotes.module.scss";
import Note from "../Note";
import axios from "axios";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
const MyNotes = () => {
  // const [notes, setNotes] = useState([]);

  // const fetchNotes = async () => {
  //   const { data } = await axios.get("/api/notes");
  //   setNotes(data);
  //   console.log(data);
  // };
  const history = useNavigate();

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;
  console.log(noteList, "noteList");

  // const filteredNotes = notes.filter((note) =>
  //   note.title.toLowerCase().includes(search.toLowerCase())
  // );

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const noteDelete = useSelector((state) => state.noteDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = noteDelete;

  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { success: successUpdate } = noteUpdate;

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history("/");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
  };

  return (
    <div className={s.mainContainer}>
      {notes &&
        notes.map((value) => {
          return (
            <Note title={value.title} content={value.content} key={value._id} />
          );
        })}
    </div>
  );
};

export default MyNotes;
