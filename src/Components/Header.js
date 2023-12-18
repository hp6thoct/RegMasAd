import React from "react";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        {/* Brand/logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://cdn2.vectorstock.com/i/1000x1000/26/91/online-shop-logo-template-icon-vector-30562691.jpg"
            alt="Online Shop Logo"
            height="40"
          />
        </Navbar.Brand>

        {/* Toggle button for mobile */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Navigation links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/course">
              Course
            </Nav.Link>
            <Nav.Link as={Link} to="/student">
              Student
            </Nav.Link>
            <Nav.Link as={Link} to="/subject">
              Subject
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
