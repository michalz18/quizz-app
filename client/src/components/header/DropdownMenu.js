import React, { useState } from "react";
import "./DropdownMenu.css";
import { useLoggedUser } from "../../App";

export default function AccountDropdown({ changePage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { loggedUser, setLoggedUser } = useLoggedUser();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleOptionClick(option) {
    console.log(option);
    setIsMenuOpen(false);
    changePage(option);
  }

  return (
    <div className="account-dropdown">
      <button onClick={toggleMenu}>Hello, {loggedUser.split("@")[0]}</button>
      {isMenuOpen && (
        <ul className="dropdown-menu">
          <li onClick={() => handleOptionClick("Change password")}>
            Change Password
          </li>
          <li onClick={() => handleOptionClick("Scoreboard")}>
            Your Scoreboard
          </li>
          <li
            onClick={() => {
              handleOptionClick("Home");
              setLoggedUser("");
            }}
          >
            Logout
          </li>
        </ul>
      )}
    </div>
  );
}
