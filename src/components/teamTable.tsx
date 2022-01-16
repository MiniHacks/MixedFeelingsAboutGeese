import React, { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { nflTeams, nbaTeams, mlbTeams, nhlTeams } from "../resources/teams";
import "../styles/custom.css";

const TeamTable = () => {
  const [selectedTeams, setTeams] = useState([]);

  const renderTeamCheckForm = (teams: string[]) => {
    return (
      <React.Fragment>
        {teams.map((t) => {
          return (
            <Form.Check
              type="checkbox"
              key={t}
              label={t}
              onClick={() => handleTeamSelect(t)}
            />
          );
        })}
      </React.Fragment>
    );
  };

  const handleTeamSelect = (team: string) => {
    const copyTeams: string[] = [...selectedTeams];
    const teamIdx: number = copyTeams.indexOf(team);
    if (teamIdx > -1) {
      copyTeams.splice(teamIdx, 1);
    } else {
      copyTeams.push(team);
    }
    setTeams(copyTeams);
    console.log(copyTeams);
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
