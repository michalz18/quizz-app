import React, { useState } from "react"
import "./DropdownMenu.css"

export default function AccountDropdown() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function toggleMenu() {
        setIsMenuOpen(!isMenuOpen);
    }

    function handleOptionClick(option) {
        console.log(option)
        setIsMenuOpen(false);
    }

    return (
        <div className="account-dropdown">
            <button onClick={toggleMenu}>ACCOUNT</button>
            {isMenuOpen && (
                <ul className="dropdown-menu">
                    <li onClick={() => handleOptionClick("Change password")}>Change Password</li>
                    <li onClick={() => handleOptionClick("Scoreboard")}>Your Scoreboard</li>
                </ul>
            )}
        </div>
    )
}