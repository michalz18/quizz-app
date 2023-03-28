import React, { useState } from "react";
import Modal from "react-pure-modal";
import "./Feedback.css";

const Feedback = ({ isOpen, onClose, onSubmit, loggedUser }) => {
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackRate, setFeedbackRate] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("http://localhost:8080/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: loggedUser,
        feedbackText: feedbackText,
        feedbackRate: feedbackRate,
      }),
    });

    onSubmit();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} className="feedback-modal">
      <h2 className="feedback-modal__title">Give us a feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-modal__form">
        <label className="feedback-modal__label">
          Feedback text:
          <textarea
            placeholder="How did you enjoy using our app?"
            value={feedbackText}
            onChange={(event) => setFeedbackText(event.target.value)}
            className="feedback-modal__textarea"
          />
        </label>
        <label className="feedback-modal__label">
  Feedback rate:
  <div className="feedback-modal__stars">
    <span
      className={`feedback-modal__star${feedbackRate >= 1 ? " active" : ""}`}
      onClick={() => setFeedbackRate(1)}
      value="1"
    >
      ★
    </span>
    <span
      className={`feedback-modal__star${feedbackRate >= 2 ? " active" : ""}`}
      onClick={() => setFeedbackRate(2)}
      value="2"
    >
      ★
    </span>
    <span
      className={`feedback-modal__star${feedbackRate >= 3 ? " active" : ""}`}
      onClick={() => setFeedbackRate(3)}
      value="3"
    >
      ★
    </span>
    <span
      className={`feedback-modal__star${feedbackRate >= 4 ? " active" : ""}`}
      onClick={() => setFeedbackRate(4)}
      value="4"
    >
      ★
    </span>
    <span
      className={`feedback-modal__star${feedbackRate >= 5 ? " active" : ""}`}
      onClick={() => setFeedbackRate(5)}
      value="5"
    >
      ★
    </span>
  </div>
</label>
        <button type="submit" className="feedback-modal__submit">
          Submit feedback
        </button>
      </form>
    </Modal>
  );
};

export default Feedback;
