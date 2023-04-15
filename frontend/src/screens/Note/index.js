import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import s from "./Note.module.scss";
import { motion } from "framer-motion";
const Note = (props) => {
  const [openModal, setOpenModal] = useState(false);
  const history = useNavigate();
  const { title, content, value } = props;
  const onClickHandlerNote = () => {
    // history(`/note/${value._id}`);
    setOpenModal(true);
  };
  return (
    <div className={s.mainContainer}>
      <div className={s.noteWrapper}>
        <div className={s.notebook}>
          <Link to={`/note/${value._id}`}>
            <div
              className={s.notebookCover}
              style={{ backgroundColor: value.bgColor }}
              onClick={() => {
                onClickHandlerNote();
              }}
            >
              <div className={s.notebookSkin}>
                <div className={s.title}>{title}</div>
              </div>
            </div>
            <div
              className={s.notebookPage}
              onClick={() => {
                onClickHandlerNote();
              }}
            >
              {content}
            </div>
          </Link>
        </div>
      </div>
      {/* {openModal && <Modal />} */}
    </div>
  );
};

const Modal = (props) => {
  return (
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
      />
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
        style={{ backgroundColor: "blue" }}
        className={s.modalContentWrapper}
      >
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
          // dangerouslySetInnerHTML={createMarkup(content)}
        >
          hellllllo
        </motion.div>
      </motion.div>
    </>
  );
};

export default Note;
