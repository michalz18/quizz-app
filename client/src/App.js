import "./App.css";
import Header from "./components/header/Header";
import Home from "./components/Home/Home";
import About from "./components/about/About";
import { useEffect, useState } from "react";
import Quizzes from "./components/quizzes/Quizzes";
import How from "./components/how/How";
import Scoreboard from "./components/account/Scoreboard";
import ChangePassword from "./components/account/ChangePasword";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";

function App() {
  const [menuChoices, setMenuChoices] = useState([
    { element: <Home goToQuizes={() => changePage('Quizzes')}/>, text: "Home", active: true},
    { element: <How goToQuizes={() => changePage('Quizzes')}/>, text: "How it works?", active: false },
    { element: <Quizzes/>, text: "Quizzes", active: false },
    { element: <About />, text: "About us", active: false }
  ]);
  const [content, setContent] = useState(findContent());
  const [modal, setModal] = useState(false);
  const [loggedUser, setLoggedUser] = useState({});
  
  useEffect(()=> {
    const newChoices = [...menuChoices];
    newChoices.forEach((choice) => (choice.active = false));
    newChoices.find((choice) => choice.element === content).active = true;
    setMenuChoices(newChoices);
    sessionStorage.setItem("currentContent", menuChoices.find(choice => choice.active).text);
  }, [content]);

  function findContent() {
    const text = sessionStorage.getItem("currentContent");
    return menuChoices.find((choice) => (text === null) ? choice.active : choice.text === text).element;
  }

  function changePage(text) {
    setContent(menuChoices.find((choice) => choice.text === text).element);
  }

  const closeModal = () => {
    setModal(false);
  }

  const openModal = () => {
    setModal(true);
  }

  function loggUser(user) {
    setLoggedUser(user);
  }

  return (
    <div className="App">
      <Header menuChoices={menuChoices} openModal={openModal} onLogoClick={() => changePage('Welcome')} changePage={(e) => changePage(e.target.textContent)} />
      <div id="content">{content}
      <LoginPopUp open={modal} close={closeModal} loggUser={loggUser}/>
      </div>

    </div>
  );
}

export default App;
