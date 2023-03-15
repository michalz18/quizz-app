import './Header.css';
import MenuChoice from "./MenuChoice.js";
import { useEffect, useState } from 'react';
import logo from './logo.jpg'

function Header({ menuChoices, changePage, onLogoClick }) {
  const [choices, setChoices] = useState([]);
  useEffect(() => {
    setChoices(menuChoices.filter(choice => choice.text != 'Home'))
  }, [])
  
  return (
    <div id="header">
      <div id="logo-and-name-wrapper" onClick={onLogoClick}>
        <div id="logo-wrapper">
          <img id="logo" src={logo} alt="logo"></img>
        </div>
        <div id="app-name">Quiz<section id="sec-part">App</section></div>
      </div>
      <div id="navigation">
        <div id="navbar-wrapper">
          <div id="navbar">
            {choices.map((menuChoice, index) => 
            <MenuChoice key={index} menuChoice={menuChoice} changePage={changePage}/>
            )}
          </div>
        </div>
        <div id="bar-icon-wrapper">
          <img id="bar-icon" src="/menu.png" alt="menu-icon"></img>
        </div>
        <button id="login">LOGIN</button>
      </div>
    </div>
  );
}
export default Header;
