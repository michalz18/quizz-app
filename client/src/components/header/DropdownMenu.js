import React, { useState } from "react";
import "./DropdownMenu.css";
import { useLoggedUser } from "../../App";
import Feedback from "../feedback/Feedback";

export default function AccountDropdown({ changePage, dropdownChoices, loggout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { loggedUser, setLoggedUser } = useLoggedUser();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleOptionClick(option) {
    setIsMenuOpen(false);
    if (option === "Logout") {
      setShowFeedback(true);
    } else {
      changePage(option);
    }
  }

  function handleFeedbackSubmit() {
    loggout();
  }

  return (
    <>
      <div className="account-dropdown">
        <button onClick={toggleMenu}>Hello, {loggedUser.split("@")[0]}!</button>
        {isMenuOpen && (
          <ul className="dropdown-menu">
            {dropdownChoices.map((choice) => (
              <li onClick={() => handleOptionClick(choice.text)}>
              {choice.text}
            </li>
            ))}
            <li onClick={() => handleOptionClick("Logout")}>Logout</li>
          </ul>
        )}
      </div>
      {showFeedback && (
        <Feedback
          isOpen={true}
          onClose={() => {
            setShowFeedback(false);
            loggout();
          }}
          onSubmit={() => handleFeedbackSubmit()}
          loggedUser={loggedUser}
        />
      )}
    </>
  );
}
