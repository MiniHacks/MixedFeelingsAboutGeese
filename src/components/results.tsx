import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const Results = ({ miseryScore, miseryTeams }) => {
  const [mostMiserable, setMostMiserable] = useState({
    teamname: null,
    title_score: null,
    average_elo: null,
  });
  const [leastMiserable, setLeastMiserable] = useState({
    teamname: null,
    title_score: null,
    average_elo: null,
  });

  useEffect(() => {
    const userTeams: string[] = Object.keys(miseryTeams);
    userTeams.sort((a, b) => (miseryTeams[a] < miseryTeams[b] ? 1 : -1));
    getTeamInfo(userTeams[0], false);
    getTeamInfo(userTeams[userTeams.length - 1], true);
  });

  const getTeamInfo = async (teamname: string, least: boolean) => {
    const { title_score, average_elo } = (
      await getDoc(doc(db, "team_info", teamname))
    ).data();
    const teamObj = { teamname, title_score, average_elo };
    if (least) {
      setLeastMiserable(teamObj);
    } else {
      setMostMiserable(teamObj);
    }
  };

  const renderMostMiserableTeam = () => {
    return (
      <div>
        <h3 className="select">
          The team that makes you the most miserable is:
        </h3>
        <h3 className="select">The {mostMiserable.teamname}</h3>
        <h4 className="pText">
          The {mostMiserable.teamname} have a recent average ELO rating of{" "}
          {mostMiserable.average_elo} when compared to the average value of
          1400.
        </h4>
        {/* CHART GOES HERE */}
        <h4 className="pText">
          The {mostMiserable.teamname} have a success rating of{" "}
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
        <h3 className="select">The {leastMiserable.teamname}</h3>
        <h4 className="pText">
          The {leastMiserable.teamname} have a recent average ELO rating of{" "}
          {leastMiserable.average_elo} when compared to the average value of
          1400.
        </h4>
        {/* CHART GOES HERE */}
        <h4 className="pText">
          The {leastMiserable.teamname} have a success rating of{" "}
          {leastMiserable.title_score} since the year 2000 compared to an
          average team's value of 4400.
        </h4>
      </div>
    );
  };

  return (
    <div>
      <h1 className="misery">your results....</h1>
      {mostMiserable.teamname !== null ? renderMostMiserableTeam() : null}
      {Object.keys(miseryTeams).length > 1 && leastMiserable.teamname !== null
        ? renderLeastMiserableTeam()
        : null}
    </div>
  );
};

export default Results;
