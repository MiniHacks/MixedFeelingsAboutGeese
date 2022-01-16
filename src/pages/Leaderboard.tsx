import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import LeaderTable from "../components/leaderTable";
import Results from "../components/results";

export default function Leaderboard({ auth }) {
  const [misery, setMisery] = useState(null);
  const [miseryTeams, setMiseryTeams] = useState(null);
  const [saved, setSaved] = useState(false);

  const getUser = async () => {
    const { miseryScore, teams, saved } = (
      await getDoc(doc(db, "users", auth))
    ).data();
    if (saved) {
      setMisery(miseryScore);
      setMiseryTeams(teams);
    }
    setSaved(saved);
  };

  useEffect(() => {
    getUser();
  });

  return (
    <div className="page leaderboard">
      {saved && <Results miseryScore={misery} miseryTeams={miseryTeams} />}
      <LeaderTable miseryIndex={misery} />
    </div>
  );
}
