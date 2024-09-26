import "./Home.css";
import React, { useState } from "react";
import View1 from "./Products/Products";
import View2 from "./Users/Users";
import View3 from "./About/About";
import {
  Container,
  Dropdown,
  DropdownButton,
  DropdownDivider,
  Image,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const navigate = useNavigate();
  const [view, setView] = useState(1);
  const notify = () => toast("Wow so easy!");
  const changePage = (view) => {
    setView(view);
  };
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className="navBarContainer" onClick={() => changePage(1)}>PS2 Market</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => changePage(1)}>Products</Nav.Link>
            <Nav.Link onClick={() => changePage(2)}>Users</Nav.Link>
            <Nav.Link onClick={() => changePage(3)}>About</Nav.Link>
          </Nav>
          <Nav className="UserInfo">
            <Image className='UserAvatar'
              src="https://media.istockphoto.com/id/1337144146/pt/vetorial/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=_XeYoSJQIN7GrE08cUQDJCo3U7yvoEp5OKpbhQzpmC0="
              roundedCircle
            />
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Igor Teles
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={notify}>Meu Perfil</Dropdown.Item>
                <DropdownDivider/>
                <Dropdown.Item onClick={() => navigate("/")}>Sair</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      {view === 1 ? <View1 /> : ""}
      {view === 2 ? <View2 /> : ""}
      {view === 3 ? <View3 /> : ""}
      <ToastContainer />
    </>
  );
};

export default Home;
