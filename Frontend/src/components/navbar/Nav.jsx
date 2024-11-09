import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../../assets/logo.webp";
import Avatar from "../../assets/gCap.webp";
import Dropdown from 'react-bootstrap/Dropdown';
import { PersonFill, GearFill, BoxArrowRight } from "react-bootstrap-icons";
import "./Nav.css";

function ColorSchemesExample() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/home" className="brand-img">
            <img src={Logo} alt="logo" /> Moodle.LK
          </Navbar.Brand>
          <Nav className="">
          <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/dashboard">Key Links</Nav.Link>
            <Nav.Link href="#features">FAQ</Nav.Link>
            <Nav.Link href="#pricing">Results</Nav.Link>
            <Dropdown className="dropdown">
              <Dropdown.Toggle id="dropdown-basic" className="dropdown-btn">
                <img src={Avatar} alt="avatar" />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="/edit-profile">
                  <PersonFill style={{ marginRight: '8px' }} />
                  Edit Profile
                </Dropdown.Item>
                <Dropdown.Item href="">
                  <GearFill style={{ marginRight: '8px' }} />
                  Settings
                </Dropdown.Item>
                <Dropdown.Item href="/">
                  <BoxArrowRight style={{ marginRight: '8px' }} />
                  LogOut
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default ColorSchemesExample;
