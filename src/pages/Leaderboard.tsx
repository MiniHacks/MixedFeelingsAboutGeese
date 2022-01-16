import React from "react";
import LeaderTable from "../components/leaderTable";

export default function Leaderboard({ auth }) {
  return (
    <div className="page leaderboard">
      <LeaderTable auth={auth} />
    </div>
  );
}
