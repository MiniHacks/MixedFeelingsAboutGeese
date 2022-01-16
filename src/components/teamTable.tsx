import React, { useState } from "react";
import { Accordion, Container, Row, Col, Form } from "react-bootstrap";
import { nflTeams, nbaTeams, mlbTeams, nhlTeams } from "../resources/teams";
import "../styles/custom.css";

const TeamTable = ({ onSelect }) => {
  const renderTeamCheckForm = (teams: string[]) => {
    return (
      <Container>
        <Row>
          {[0, 1, 2].map((page) => {
            const colTeams: string[] = teams.slice(10 * page, 10 * (page + 1));
            return (
              <Col>
                {colTeams.map((t) => {
                  return (
                    <Form.Check
                      type="checkbox"
                      key={t}
                      label={t}
                      onClick={() => onSelect(t)}
                    />
                  );
                })}
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  };

  return (
    <React.Fragment>
      <Accordion className="dropdown">
        <Accordion.Item eventKey="0">
          <Accordion.Header>National Football League (NFL)</Accordion.Header>
          <Accordion.Body>
            {renderTeamCheckForm(nflTeams.sort())}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>
            National Basketball Association (NBA)
          </Accordion.Header>
          <Accordion.Body>
            {renderTeamCheckForm(nbaTeams.sort())}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Major League Baseball (MLB)</Accordion.Header>
          <Accordion.Body>
            {renderTeamCheckForm(mlbTeams.sort())}
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>National Hockey League (NHL)</Accordion.Header>
          <Accordion.Body>
            {renderTeamCheckForm(nhlTeams.sort())}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </React.Fragment>
  );
};

export default TeamTable;
