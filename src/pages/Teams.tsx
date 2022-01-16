import React from 'react';
import CustomButton from '../components/customButton';
import TeamTable from '../components/teamTable';
let hasTeam:boolean;
let misery:number;

function getMisery(hasTeam: boolean) {
  if (hasTeam) {
    misery = 1231; /* FIXME - misery index calculation */
    return ( <h1 className="misery"> Your misery index is {misery} </h1>)
  } else {
    return ( <h1 className="misery"> Your misery index is unknown </h1> );
}
};

/* currently just a sample table + button sorry ben */

export default function Teams() {
  return (
    <div className="page teams">
      { getMisery(hasTeam) }
      <TeamTable />
      <div className="btn">
        <CustomButton text={"+ add a team"} />
      </div>
    </div>
  )
}