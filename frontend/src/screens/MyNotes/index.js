import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import s from "./MyNotes.module.scss";
import Note from "../Note";
import { deleteNoteAction, listNotes } from "../../actions/notesActions";
import Loading from "../../components/Loading";
const MyNotes = () => {
  const history = useNavigate();

  const dispatch = useDispatch();

  const noteList = useSelector((state) => state.noteList);
  const { loading, error, notes } = noteList;

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
  let cloneNotes = [];

  useEffect(() => {
    dispatch(listNotes());
    if (!userInfo) {
      history("/");
    }
    if (Array.isArray(notes)) {
      console.log(notes);
      cloneNotes = notes.sort(
        (objA, objB) => Number(objA.updatedAt) - Number(objB.updatedAt)
      );
      console.log("iiiiii", cloneNotes);
    }

    // console.log(notes);
  }, [
    dispatch,
    history,
    userInfo,
    successDelete,
    successCreate,
    successUpdate,
  ]);

  return (
    <>
      {loading && <Loading />}
      {loadingDelete && <Loading />}
      <div className={s.mainContainer}>
        {notes &&
          notes.map((value) => {
            return (
              <Note title={value.title} content={value.content} value={value} />
            );
          })}
      </div>
    </>
  );
};

export default MyNotes;
