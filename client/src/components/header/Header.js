import './Header.css';
import MenuChoice from "./MenuChoice.js";
import { useEffect, useState } from 'react';
import logo from './logo.jpg'
import DropdownMenu from "./DropdownMenu"


function Header({ menuChoices, changePage, onLogoClick, openModal, loggedUser }) {
  const [choices, setChoices] = useState([]);
  useEffect(() => {
    setChoices(menuChoices.filter(choice => choice.text != 'Home'))
  }, [])
  
  return (
    <div id="header">
      <div id="logo-and-name-wrapper" onClick={onLogoClick}>
        <div id="logo-wrapper">
          <img className='HeaderLogo' id="logo" src={logo} alt="logo"></img>
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
      </div>
      {loggedUser.email === undefined 
        ? <button id="login" onClick={openModal}>LOGIN</button>
        : <DropdownMenu changePage={changePage}/>
        }
    </div>
  );
}
export default Header;
