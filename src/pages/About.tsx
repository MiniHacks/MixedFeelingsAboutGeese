import React from "react";
import Goose from "../components/goose";

export default function About() {
  return (
    <div className="page about">
      <h1>What is this?</h1>
      <p>
        a data-driven way to settle who is more miserable based on their
        favorite sports teams. you select your favorite teams and we tell you
        how sad you should be. compare your results to family, friends, and
        anyone else to determine how sad you actually should be.
      </p>
      <h1>How is my misery calculated?</h1>
      <p>
        team elo over the last 10 years + postseason success in the last 20
        years + secret sauce = sad
      </p>
      <h1>Who made this?</h1>
      <p>people who have mixed feelings about geese</p>
      <Goose />
    </div>
  );
}
