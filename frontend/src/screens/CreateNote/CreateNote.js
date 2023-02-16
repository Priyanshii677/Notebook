import React, { useEffect, useState, useRef, useCallback } from "react";
// import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import ReactDOM from "react-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // ES6
import s from "./CreateNote.module.scss";
import { useNavigate } from "react-router-dom";
// import { useQuill } from "react-quilljs";

function CreateNote() {
  const [title, setTitle] = useState("title first");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("no");
  const dispatch = useDispatch();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  // console.log(note);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  let history = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createNoteAction(title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history("/mynotes");
  };

  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) return "";
    wrapper.innerHTML = "";

    const editor = document.createElement("div");
    wrapper.append(editor);
    new Quill(editor, { theme: "snow" });
  }, []);
  console.log(content, "content");
  return (
    <div className={s.CreateNote}>
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <button
        onClick={(e) => {
          submitHandler(e);
        }}
      >
        Save
      </button>
      <div
        id='container'
        ref={wrapperRef}
        onInput={(e) => {
          setContent(e.currentTarget.textContent);
        }}
      ></div>
    </div>
  );
}

export default CreateNote;
