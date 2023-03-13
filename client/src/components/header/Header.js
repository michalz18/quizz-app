import './Header.css';
import MenuChoice from "./MenuChoice.js";

function Header({ menuChoices, changePage, onLogoClick }) {
  // TODO wrzucić logo
  return (
    <div id="header">
      <div id="logo-and-name-wrapper" onClick={onLogoClick}>
        <div id="logo-wrapper">
          <img id="logo" src="/ecological.png" alt="logo"></img>
        </div>
        <div id="app-name">Quiz<section id="sec-part">App</section></div>
      </div>
      <div id="navigation">
        <div id="navbar-wrapper">
          <div id="navbar">
            {menuChoices.map((menuChoice, index) => 
            <MenuChoice key={index} menuChoice={menuChoice} changePage={changePage}/>
            )}
            <button id="login">LOGIN</button>
          </div>
        </div>
        <div id="bar-icon-wrapper">
          <img id="bar-icon" src="/menu.png" alt="menu-icon"></img>
        </div>
      </div>
    </div>
  );
}
export default Header;
