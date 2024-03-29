import React, { useEffect, useState, useRef } from "react";
// import MainScreen from "../../components/MainScreen";
import { useDispatch, useSelector } from "react-redux";
import { updateNoteAction, deleteNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import ReactDOM from "react-dom";
import "quill/dist/quill.snow.css"; // ES6
import s from "./CreateNote.module.scss";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
// import { useQuill } from "react-quilljs";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { AiFillEdit, AiTwotoneSave, AiFillDelete } from "react-icons/ai";

function SingleNote() {
  const [title, setTitle] = useState("title first");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("no");
  const [bgColor, setBgColor] = useState("red");
  const [loader, setLoader] = useState(false);
  const [newContent, setNewContent] = useState("");
  const dispatch = useDispatch();
  const location = useLocation();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  let history = useNavigate();
  const params = useParams();

  const deleteHandler = () => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      dispatch(deleteNoteAction(params.id));
    }
    history("/mynotes");
  };

  useEffect(() => {
    console.log("1stttttt");
    const fetching = async () => {
      const { data } = await axios.get(`/api/notes/${params.id}`);

      setTitle(data.title);
      setContent(data.content);
      setBgColor(data.bgColor);
      setLoader(false);
    };
    setLoader(true);
    fetching();
  }, [params.id]);

  function createMarkup(html) {
    return {
      __html: DOMPurify.sanitize(html),
    };
  }

  // useEffect(() => {
  //   const textContent = { __html: content.replace(/<\/?[^>]+(>|$)/g, "") };
  //   setNewContent(textContent);
  //   console.log(content);
  //   console.log(textContent, "textContent");
  // }, [content]);

  const resetHandler = () => {
    setTitle("");
    setCategory("no");
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
      background: bgColor,
      color: "black",
      fontSize: "22px",
    },
  };
  return (
    <>
      {loader && <Loading />}
      {!loader && (
        <div className={s.mainModal}>
          <div className={s.createNote} style={{ backgroundColor: bgColor }}>
            <input
              type='text'
              placeholder=''
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            />

            <div className={s.editor}>
              <JoditEditor
                ref={editor}
                value={content}
                tabIndex={1}
                config={config}
                onBlur={(newContent) => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                // onChange={(newContent) => setContent(newContent)}
              />
            </div>

            <div className={s.footer}>
              <button
                onClick={(e) => {
                  updateHandler(e);
                }}
                className={s.saveButton}
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  deleteHandler();
                }}
                className={s.saveButton}
              >
                Delete
              </button>
            </div>
          </div>
          {/* <div
            className='preview'
            dangerouslySetInnerHTML={createMarkup(content)}
          ></div> */}
        </div>
      )}
    </>
  );
}

export default SingleNote;
