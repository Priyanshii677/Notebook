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
import JoditEditor from "jodit-react";
// import { useQuill } from "react-quilljs";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("6666");
  const [bgColor, setBgColor] = useState("red");
  const dispatch = useDispatch();
  const location = useLocation();

  const noteCreate = useSelector((state) => state.noteCreate);
  const { loading, error, note } = noteCreate;

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
    setBgColor("red");
  };

  let history = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    const p = location.state.bgColor;
    setBgColor(p);
    dispatch(createNoteAction(title, content, category, p));
    if (!title || !content || !category || !p) return;

    resetHandler();
    history("/mynotes");
  };
  const editor = useRef(null);
  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/doc/
    height: "75vh",
    width: "100%",
    enableDragAndDropFileToEditor: true,
    buttons: [
      "source",
      "|",
      "bold",
      "italic",
      "underline",
      "|",
      "ul",
      "ol",
      "|",
      "font",
      "fontsize",
      "brush",
      "paragraph",
      "|",
      "image",
      "table",
      "link",
      "|",
      "left",
      "center",
      "right",
      "justify",
      "|",
      "undo",
      "redo",
      "|",
      "hr",
      "eraser",
      "fullsize",
    ],
    uploader: { insertImageAsBase64URI: true },
    removeButtons: ["brush", "file"],
    showXPathInStatusbar: false,
    showCharsCounter: false,
    showWordsCounter: false,
    toolbarAdaptive: true,
    toolbarSticky: true,
    style: {
      background: location.state.bgColor,
      color: "black",
      fontSize: "22px",
    },
  };

  return (
    <div className={s.mainModal}>
      <div
        className={s.createNote}
        style={{ backgroundColor: location.state.bgColor }}
      >
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          config={config}
          onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          // onChange={(newContent) => setContent(newContent)}
        />

        <input
          type='text'
          placeholder=''
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
          }}
        />

        <div className={s.footer}>
          <button
            onClick={(e) => {
              submitHandler(e);
            }}
            className={s.saveButton}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateNote;
