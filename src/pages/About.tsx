import React from 'react';
import Goose from '../components/goose';

export default function About() {
  return (
    <div className="page about">
      <h1>What is this?</h1>
      <p>a data-driven way to settle who is more miserable based on their favorite sports teams</p>
      <h1>How is my misery calculated?</h1>
      <p>team elo + loss streak + secret sauce = sad</p>
      <h1>Who made this?</h1>
      <p>people who have mixed feelings about geese</p>
      <Goose />
    </div>
  )
}