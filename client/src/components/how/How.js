import React from "react";
import HowItWorksImage from "./howitworksimg.png";
import "./How.css";
import { useLoggedUser } from "../../App";

function How({ goToQuizes, openLogInModal }) {
  const { loggedUser } = useLoggedUser();

  return (
    <div className="How">
      <img className="manImage" src={HowItWorksImage} alt="how it works" />
      <div className="right-container">
        <h1 className="header">Welcome to our quiz web app!</h1>
        <p className="text">
          Our app is designed to provide an engaging and entertaining way for
          you to test your knowledge, learn new things, and challenge yourself
          with various trivia questions.
        </p>
        <p className="text">
          So how does our app work? It's simple! <br></br>
          First, access our app through a web browser. Once you've landed on our
          main page, you can create an account or sign in using an existing
          social media account. Next, browse through our selection of quizzes on
          various topics. Choose the quiz you want to take, and start answering
          the questions.
        </p>
        <p className="text">
          After you've answered a question, the app will provide immediate
          feedback, letting you know whether you got the question right or
          wrong. You can track your progress throughout the quiz, and at the end
          of the quiz, you'll receive your final score. Overall, our quiz web
          app is a fun and engaging way to learn new things, challenge yourself,
          and have fun with friends. Access our app today and start exploring!
        </p>
        {loggedUser ? (
          <button className="move-btn" onClick={goToQuizes}>
            Start solving
          </button>
        ) : (
          <button className="move-btn" onClick={openLogInModal}>
            Start solving
          </button>
        )}
      </div>
    </div>
  );
}

export default How;
