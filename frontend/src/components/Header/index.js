import React from "react";
import notesIcon from "../../utils/svgs/notes-icon.svg";
import searchIcon from "../../utils/svgs/search-icon.svg";
import tagsIcon from "../../utils/svgs/tags-icon.svg";
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";

import { RiEditBoxFill } from "react-icons/ri";

import { Container, Nav, Navbar, NavDropdown, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";
const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logOutHandler = () => {
    console.log("log out called");
    dispatch(logout());
    // history.push("/");
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
        <Navbar.Collapse id='navbarScroll'>
          <Nav
            className='me-auto my-2 my-lg-0'
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href='#action1'>
              <img
                src={searchIcon}
                alt='search icon'
                style={{
                  width: "20px",
                  marginLeft: "18px",
                }}
              ></img>
            </Nav.Link>
            <Nav.Link href='#action2'>
              <img
                src={tagsIcon}
                alt='tags icon'
                style={{
                  width: "24px",
                  marginRight: "8px",
                  marginLeft: "8px",
                }}
              />
            </Nav.Link>
            <Nav.Link href='/mynotes'>
              <Link to='/mynotes'>My Notes</Link>
            </Nav.Link>
            <NavDropdown title='Link' id='navbarScrollingDropdown'>
              <NavDropdown.Item href='#action3'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action4'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action5'>
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='#' disabled>
              Link
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

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
