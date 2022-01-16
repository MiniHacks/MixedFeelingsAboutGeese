import React from 'react';
import { Link } from 'react-router-dom';
import CustomButton from '../components/customButton';
import '../styles/custom.css';
/* import { Link } from 'react-router-dom'; */

/* questionable code woohoo! */
export default function Home() {
  return (
    <div className="page home">
      <h1>How
        <span>
          <span> </span>
          <span className="dance">m</span>
          <span className="dance">i</span>
          <span className="dance">s</span>
          <span className="dance">e</span>
          <span className="dance">r</span>
          <span className="dance">a</span>
          <span className="dance">b</span>
          <span className="dance">l</span>
          <span className="dance">e</span>
          <span> </span>
        </span>
          are you according to your sports?</h1>
        <Link to="/teams">
          <CustomButton />
        </Link>
    </div>
  );
};