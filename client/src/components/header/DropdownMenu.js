import React, { useState } from "react";
import "./DropdownMenu.css";
import { useLoggedUser } from "../../App";
import Feedback from "../feedback/Feedback";

export default function AccountDropdown({ changePage, dropdownChoices, loggout }) {
  
  const [showFeedback, setShowFeedback] = useState(false);
  const { loggedUser, setLoggedUser } = useLoggedUser();

  function handleOptionClick(option) {
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
        <button >Hello, {loggedUser.split("@")[0]}!</button>
        
          <ul className="dropdown-menu">
            {dropdownChoices.map((choice, index) => (
              <li key={index} onClick={() => handleOptionClick(choice.text)}>
              {choice.text}
            </li>
            ))}
            <li onClick={() => handleOptionClick("Logout")}>Logout</li>
          </ul>
        
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
