import React, { useState, useEffect } from "react";
import { useLoggedUser } from "../../App";
import "./Scoreboard.css";

export default function Scoreboard({ changePage }) {
  const { loggedUser } = useLoggedUser();
  const [quizScores, setQuizScores] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/score/${loggedUser}`)
      .then((response) => response.json())
      .then((data) => setQuizScores(data))
      .catch((error) => console.error(error));
  }, [loggedUser]);

  return (
    <div className="scoreboard">
      <h1 className="scoreboard__title">Your Scoreboard</h1>
      {quizScores.map((quiz) => (
        <p key={quiz.id} className="scoreboard__score">
          {quiz.title}: Your score - {quiz.score}
        </p>
      ))}
      <button className="scoreboard__closing-btn" onClick={() => changePage("Home")}>Close</button>
    </div>
  );
}
