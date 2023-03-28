import React, { useState } from "react";
import "./DropdownMenu.css";
import { useLoggedUser } from "../../App";
import Feedback from "../feedback/Feedback";

export default function AccountDropdown({ changePage }) {
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

  return (
    <>
      <div className="account-dropdown">
        <button onClick={toggleMenu}>Hello, {loggedUser.split("@")[0]}!</button>
        {isMenuOpen && (
          <ul className="dropdown-menu">
            <li onClick={() => handleOptionClick("Change password")}>
              Change Password
            </li>
            <li onClick={() => handleOptionClick("Scoreboard")}>
              Your Scoreboard
            </li>
            <li onClick={() => handleOptionClick("Add new quiz")}>
              Add new quiz
            </li>
            <li onClick={() => handleOptionClick("Logout")}>Logout</li>
          </ul>
        )}
      </div>
      {showFeedback && (
        <Feedback
          isOpen={true}
          onClose={() => setShowFeedback(false)}
          onSubmit={() => {
            setLoggedUser("");
            changePage("Home");
          }}
          loggedUser={loggedUser}
        />
      )}
    </>
  );
}
