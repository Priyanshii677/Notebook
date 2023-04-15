import React, { useEffect, useState, useRef } from "react";
// import MainScreen from "../../components/MainScreen";
import { connect, useDispatch, useSelector } from "react-redux";
import { updateNoteAction, deleteNoteAction } from "../../actions/notesActions";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import ReactMarkdown from "react-markdown";
import ReactDOM from "react-dom";
import "quill/dist/quill.snow.css"; // ES6
import s from "./SingleNoteModal.module.scss";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import axios from "axios";
import JoditEditor from "jodit-react";
// import { useQuill } from "react-quilljs";
import parse from "html-react-parser";
import DOMPurify from "dompurify";
import { AiFillEdit, AiTwotoneSave, AiFillDelete } from "react-icons/ai";
import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import video from "./video.mp4";

function SingleNoteModal() {
  const [title, setTitle] = useState("title first");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("no");
  const [bgColor, setBgColor] = useState("red");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const noteUpdate = useSelector((state) => state.noteUpdate);
  const { loading, error } = noteUpdate;
  const [isEditMode, setIsEditMode] = useState(false);

  const noteDelete = useSelector((state) => state.noteDelete);
  const { loading: loadingDelete, error: errorDelete } = noteDelete;

  let history = useNavigate();
  const params = useParams();

  const deleteHandler = () => {
    if (window.confirm("Are you sure?")) {
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
    setIsEditMode(false);
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
        <>
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 0.3,
              },
            }}
            className={s.modalBackdrop}
          ></motion.div>
          <motion.div
            initial={{
              scale: 0,
            }}
            animate={{
              scale: 1,
              transition: {
                duration: 0.3,
              },
            }}
            style={{ backgroundColor: bgColor }}
            className={s.modalContentWrapper}
          >
            <input
              value={title}
              placeholder='Enter Title here'
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className={s.title}
              readOnly={!isEditMode}
            />
            <div style={{ display: "flex" }}>
              <motion.div
                initial={{
                  x: 100,
                }}
                animate={{
                  x: 0,
                  transition: {
                    delay: 0.3,
                    duration: 0.3,
                  },
                }}
                className={s.modalContent}
              >
                {!isEditMode ? (
                  <div
                    dangerouslySetInnerHTML={createMarkup(content)}
                    className={s.displayContent}
                  ></div>
                ) : (
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
                )}
              </motion.div>
              <div className={s.iconFlex}>
                {!isEditMode && (
                  <>
                    <AiFillEdit
                      onClick={() => {
                        setIsEditMode(true);
                      }}
                      data-tooltip-id='tooltip-edit'
                    />
                    <Tooltip
                      id='tooltip-edit'
                      content='Edit'
                      className={s.tooltip}
                    />
                  </>
                )}
                {isEditMode && (
                  <>
                    <AiTwotoneSave
                      style={{ marginBottom: "16px" }}
                      data-tooltip-id='tooltip-save'
                      onClick={updateHandler}
                    />
                    <Tooltip
                      id='tooltip-save'
                      content='Save'
                      className={s.tooltip}
                    />
                    <AiFillDelete
                      data-tooltip-id='tooltip-delete'
                      onClick={deleteHandler}
                    />
                    <Tooltip
                      id='tooltip-delete'
                      content='Delete'
                      className={s.tooltip}
                    />
                  </>
                )}
              </div>
            </div>
            {console.log(isEditMode)}
          </motion.div>
        </>
      )}
    </>
  );
}

export default SingleNoteModal;
