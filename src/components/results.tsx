import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Team } from "../models";
import Chart from "./Chart";

const Results = ({ miseryScore, miseryTeams }) => {
  const [mostMiserable, setMostMiserable] = useState(undefined);
  const [leastMiserable, setLeastMiserable] = useState(undefined);

  useEffect(() => {
    const userTeams: string[] = Object.keys(miseryTeams);
    userTeams.sort((a, b) => (miseryTeams[a] < miseryTeams[b] ? 1 : -1));
    getTeamInfo(userTeams[0], false);
    getTeamInfo(userTeams[userTeams.length - 1], true);
  }, []);

  const getTeamInfo = async (teamname: string, least: boolean) => {
    const { average_elo, name, title_score, elo_history, league, elo } = (
      await getDoc(doc(db, "team_info", teamname))
    ).data();
    const teamData = {
      average_elo,
      name,
      title_score,
      elo_history,
      league,
      elo,
    };
    if (least) {
      setLeastMiserable(teamData);
    } else {
      setMostMiserable(teamData);
    }
  };

  const renderMostMiserableTeam = () => {
    return (
      <div>
        <h3 className="select">
          The team that makes you the most miserable is:
        </h3>
        <h3 className="select">The {mostMiserable.name}</h3>
        <h4 className="pText">
          The {mostMiserable.name} have a recent average ELO rating of{" "}
          {mostMiserable.average_elo} when compared to the average value of
          1400.
        </h4>
        {/* <Chart datasets={[mostMiserable]} /> */}
        <h4 className="pText">
          The {mostMiserable.name} have a success rating of{" "}
          {mostMiserable.title_score} since the year 2000 compared to an average
          team's value of 4400.
        </h4>
      </div>
    );
  };

  const renderLeastMiserableTeam = () => {
    return (
      <div>
        <h3 className="select">
          The team that makes you the least miserable is:
        </h3>
        <h3 className="select">The {leastMiserable.name}</h3>
        <h4 className="pText">
          The {leastMiserable.name} have a recent average ELO rating of{" "}
          {leastMiserable.average_elo} when compared to the average value of
          1400.
        </h4>
        {/* CHART GOES HERE */}
        <h4 className="pText">
          The {leastMiserable.name} have a success rating of{" "}
          {leastMiserable.title_score} since the year 2000 compared to an
          average team's value of 4400.
        </h4>
      </div>
    );
  };

  return (
    <div>
      <h1 className="misery">your results....</h1>
      {mostMiserable !== undefined ? renderMostMiserableTeam() : null}
      {Object.keys(miseryTeams).length > 1 && leastMiserable !== undefined
        ? renderLeastMiserableTeam()
        : null}
    </div>
  );
};

export default Results;
