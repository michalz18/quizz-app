import React from "react";
import AboutUsImg from './Aboutusimg.png';
import "./About.css"

export default function About() {
  return (
    <div className="About">
      <img className ="image" src={AboutUsImg} alt="About us" />
      <div className="textContainer">
        <h1 className="header">Who we are?</h1>
        <p className="text">
          QuizApp was created by four students of the great Codecool programming
          school. Our main goal is to test the knowledge of application users
          and provide entertainment. We tried to use the best technologies we
          have learned so far to make the application as functional and pleasant
          to use as possible. We put a lot of work into it to get the best
          effect. We hope that after testing it you will appreciate our work. We
          wish you to have as much fun as we did while creating this app!
        </p>
      </div>
    </div>
  );
}
