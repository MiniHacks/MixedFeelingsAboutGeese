import React from 'react';
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

export default function Teams() {
  return (
    <div className="page teams">
      { getMisery(hasTeam) }
      <TeamTable />
    </div>
  )
}