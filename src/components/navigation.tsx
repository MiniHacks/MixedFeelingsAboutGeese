import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">miserable title</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/teams">
            Teams
          </Nav.Link>
          <Nav.Link as={NavLink} to="/leaderboard">
            Leaderboard
          </Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Navigation;