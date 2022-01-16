import React from 'react';
import CustomButton from '../components/customButton';
import '../styles/custom.css'; 
/* import { Link } from 'react-router-dom'; */

export default function Home() {
  return (
    <div className="page home">
      <h1>How miserable are you according to your sports?</h1>
      <CustomButton />
    </div>
  )
}