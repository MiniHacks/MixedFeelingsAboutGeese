import React from "react";
import { Table } from "react-bootstrap";
import '../styles/custom.css';

/* needs to be able to retrieve data from ??? , update, sort*/
/* it's all hard coded right now lol */

const LeaderTable = () => {
  return (
    <div>
      <Table striped bordered hover className="custom" borderless={true} >
        <thead>
          <tr>
            <th>standing</th>
            <th>user</th>
            <th>misery index</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2</td>
            <td>Som E. Guy</td>
            <td>1648</td>
          </tr>
          <tr>
            <td>3</td>
            <td>F. D. C. Willard</td>
            <td>1532</td>
          </tr>
          <tr>
            <td>4</td>
            <td>Socks Clinton</td>
            <td>1212</td>
          </tr>

        </tbody>
      </Table>
    </div>
  );
};

export default LeaderTable;

