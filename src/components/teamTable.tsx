import React from "react";
import { Table } from "react-bootstrap";
import '../styles/custom.css';

/* needs to be able to retrieve data from ??? , update, sort*/
/* it's all hard coded right now lol */

const TeamTable = () => {
  return (
    <div>
      <Table striped bordered hover className="custom" borderless={true} >
        <thead>
          <tr>
            <th>league</th>
            <th>team</th>
            <th>elo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NHL</td>
            <td>Toronto Maple Leafs</td>
            <td>1648</td>
          </tr>
          <tr>
            <td>NHL</td>
            <td>Dallas Stars</td>
            <td>1420</td>
          </tr>
          <tr>
            <td>NBA</td>
            <td>Minnesota Timberwolves</td>
            <td>1356</td>
          </tr>

        </tbody>
      </Table>
    </div>
  );
};

export default TeamTable;

