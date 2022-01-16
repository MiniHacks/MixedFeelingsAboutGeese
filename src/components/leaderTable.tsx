import React from "react";
import { Table } from "react-bootstrap";
import "../styles/custom.css";

const LeaderTable = ({ miseryIndex }) => {
  if (miseryIndex === null || miseryIndex === undefined) {
    return (
      <div>
        <h1 className="miserysmall">
          No misery index was found. Set one and then come back here.
        </h1>
      </div>
    );
  }
  return (
    <div>
      <h1 className="miserysmall">
        Your misery index is {miseryIndex}. The average misery index is 0.
      </h1>
      <h2 className="miseryvsmall">
        A positive index misery index indicates you are more miserable than the
        average sports fan while a negative misery index indicates that you are
        less miderable than the average sports fan.
      </h2>
    </div>
  );
};

export default LeaderTable;
