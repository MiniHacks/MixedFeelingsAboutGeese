import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Table } from "react-bootstrap";
import "../styles/custom.css";

const LeaderTable = ({ auth }) => {
  const [misery, setMisery] = useState(null);

  const getUser = async () => {
    const data = (await getDoc(doc(db, "users", auth))).data();
  };

  useEffect(() => {
    getUser();
  });

  return (
    <div>
      <Table striped bordered hover className="custom" borderless={true}>
        <thead>
          <tr>
            <th>standing</th>
            <th>user</th>
            <th>misery index</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Ada Lovelace</td>
            <td>1932</td>
          </tr>
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
