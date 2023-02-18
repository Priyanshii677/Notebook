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
import { useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
// import { useQuill } from "react-quilljs";

function CreateNote() {
  const [title, setTitle] = useState("title first");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("no");
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.state, "location.state.name");

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

    const editor = document.createElement("p");
    wrapper.append(editor);
    new Quill(editor, { theme: "snow" });
  }, []);
  console.log(content, "content");
  return (
    <div className={s.mainModal}>
      <div className={s.createNote}>
        <input
          type='text'
          placeholder=''
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder=''
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <p
          id='container'
          ref={wrapperRef}
          onInput={(e) => {
            setContent(e.currentTarget.textContent);
          }}
        ></p>

        <div className={s.footer}>
          <button
            onClick={(e) => {
              submitHandler(e);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
