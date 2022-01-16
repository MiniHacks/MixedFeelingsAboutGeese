import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import CustomButton from "../components/customButton";
import TeamTable from "../components/teamTable";

export default function Teams({ auth }) {
  const [misery, setMisery] = useState(null);
  const [selectedTeams, setTeams] = useState([]);
  const [teamMisery, setTeamMisery] = useState([]);

  function renderMiseryValue() {
    if (misery !== null) {
      return <h1 className="misery"> Your misery index is {misery} </h1>;
    } else {
      return <h1 className="misery"> Your misery index is unknown </h1>;
    }
  }

  useEffect(() => {
    getUser();
  });

  const getUser = async () => {
    const { miseryScore, teams, saved } = (
      await getDoc(doc(db, "users", auth.uid))
    ).data();
    if (saved) {
      setMisery(miseryScore);
    }
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
  };

  const calculateMisery = async () => {
    const scores: number[] = [];
    for (const targetTeam of selectedTeams) {
      if (targetTeam === "Seattle Kraken") {
        continue;
      }
      const { average_elo, title_score } = (
        await getDoc(doc(db, "team_info", targetTeam))
      ).data();
      scores.push(1400 - average_elo + (4400 - title_score) / 100);
    }

    setTeamMisery(scores);

    let total: number = 0;
    for (const score of scores) {
      total += score;
    }
    setMisery((total / scores.length).toFixed(2));
  };

  const saveMisery = async () => {
    const copyTeams = selectedTeams.filter((t) => t !== "Seattle Kraken");
    let teamScores = {};
    for (let i = 0; i < copyTeams.length; i++) {
      teamScores[copyTeams[i]] = teamMisery[i];
    }
    await updateDoc(doc(db, "users", auth.uid), {
      miseryScore: misery,
      saved: true,
      teams: teamScores,
    });
  };

  return (
    <div className="page teams">
      {renderMiseryValue()}
      <TeamTable onSelect={handleTeamSelect} />
      {selectedTeams.length === 1 ? (
        <h3 className="select">You have selected 1 team.</h3>
      ) : (
        <h3 className="select">
          You have selected {selectedTeams.length} teams.
        </h3>
      )}
      <div className="btn">
        <CustomButton
          text={misery === null ? "calculate" : "re-calculate"}
          onClick={calculateMisery}
          disabled={
            selectedTeams.length === 0 ||
            (selectedTeams.length === 1 &&
              selectedTeams[0] === "Seattle Kraken")
          }
        />
      </div>
      <div className="btn">
        <Link to="/leaderboard">
          <CustomButton
            text={"save results"}
            onClick={saveMisery}
            disabled={misery === null}
          />
        </Link>
      </div>
    </div>
  );
}
