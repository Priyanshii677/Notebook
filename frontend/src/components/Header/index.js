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

  const randomColorGen = () => {
    const randomColor = [
      "#FFC312",
      "#12CBC4",
      "#ED4C67",
      "#F79F1F",
      "#A3CB38",
      "#1289A7",
      "#9980FA",
      "#009432",
      "#EE5A24",
      "#5758BB",
      "#006266",
      "#0fb9b1",
      "#f368e0",
      "#ea8685",
      "#f8a5c2",
      "#786fa6",
      "#e66767",
      "#D6A2E8",
      "#81ecec",
      "#b2bec3",
      "#f6e58d",
      "#dff9fb",
      "#BDC581",
      "#F8EFBA",
    ];
    const x = Math.floor(Math.random() * randomColor.length);
    return randomColor[x];
  };
  const logOutHandler = () => {
    console.log("log out called");
    dispatch(logout());
    history("/");
  };

  const profilePageHandler = () => {
    history("/profile");
  };

  const createNoteHandler = (e) => {
    e.preventDefault();
    // dispatch(createNoteAction(title, content, category));
    // if (!title || !content || !category) return;
    history("/createnote", { state: { bgColor: randomColorGen() } });
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
          <Nav.Item onClick={profilePageHandler}>
            {/* <img
                      alt=""
                      src={`${userInfo.pic}`}
                      width="25"
                      height="25"
                      style={{ marginRight: 10 }}
                    /> */}
            My Profile
          </Nav.Item>
        </Navbar>
      </Container>
    </Navbar>
  );
};

export default Header;
