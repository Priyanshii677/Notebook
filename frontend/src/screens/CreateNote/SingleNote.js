import React, { useEffect, useState, useRef } from "react";
// import MainScreen from "../../components/MainScreen";
import { Button, Card, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateNoteAction, deleteNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import ReactDOM from "react-dom";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // ES6
import s from "./CreateNote.module.scss";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { BsSearch } from "react-icons/bs";
import axios from "axios";
import JoditEditor from "jodit-react";
// import { useQuill } from "react-quilljs";

function SingleNote() {
  console.log("hooooooooo");
  const [title, setTitle] = useState("title first");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("no");
  const dispatch = useDispatch();
  const location = useLocation();
  console.log(location.state, "location.state.name");

  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  // console.log(note);
  let history = useNavigate();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteNoteAction(id));
    }
    history("/mynotes");
  };
  const params = useParams();

  console.log(params, "params please");

  useEffect(() => {
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setCategory(data.category);
      console.log(data, "data");
    };

    fetching();
  }, [params.id]);

  const resetHandler = () => {
    setTitle("");
    setCategory("");
    setContent("");
  };

  const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateNoteAction(params.id, title, content, category));
    if (!title || !content || !category) return;

    resetHandler();
    history("/mynotes");
  };
  const editor = useRef(null);
  let placeholder = "";

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

        <JoditEditor
          ref={editor}
          value={content}
          // onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
          onChange={(newContent) => setContent(newContent)}
        />

        <div className={s.footer}>
          <button
            onClick={(e) => {
              updateHandler(e);
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleNote;
