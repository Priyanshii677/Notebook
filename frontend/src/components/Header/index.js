import React, { useState } from "react";
import notesIcon from "../../utils/svgs/notes-icon.svg";
import searchIcon from "../../utils/svgs/search-icon.svg";
import tagsIcon from "../../utils/svgs/tags-icon.svg";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useNavigate } from "react-router-dom";
import { RiEditBoxFill } from "react-icons/ri";

import { Container, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createNoteAction } from "../../actions/notesActions";
import { logout } from "../../actions/userActions";
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [createNoteOpen, setCreateNoteOpen] = useState(false);
  let history = useNavigate();
  const logOutHandler = () => {
    console.log("log out called");
    dispatch(logout());
    history("/");
  };

  const createNoteHandler = (e) => {
    e.preventDefault();
    // dispatch(createNoteAction(title, content, category));
    // if (!title || !content || !category) return;
    history("/createnote");
  };
  return (
    <Navbar bg='light' expand='lg' style={{ height: "48px" }}>
      <Container fluid>
        <Navbar.Brand href='#'>
          <img
            src={notesIcon}
            alt=' notebook logo'
            style={{ width: "28px", marginRight: "8px", marginLeft: "18px" }}
          ></img>
          Notebook
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />

        <Nav.Item
          onClick={(e) => {
            createNoteHandler(e);
          }}
        >
          Create Note
        </Nav.Item>

        <Navbar expand='lg' className='custom-nav'>
          <IconContext.Provider value={{ color: "white", size: "40px" }}>
            <div>
              <RiEditBoxFill />
            </div>

            <Nav.Item onClick={logOutHandler} style={{ color: "white" }}>
              Logout
            </Nav.Item>
          </IconContext.Provider>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
