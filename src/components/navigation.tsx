import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import '../styles/custom.css'; 

const Navigation = () => {
  return (
    <Navbar className=".custom" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">miserable title</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/teams">
            teams
          </Nav.Link>
          <Nav.Link as={NavLink} to="/leaderboard">
            leaderboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/about">
            about
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;