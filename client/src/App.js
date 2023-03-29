import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "./components/header/Header";
import Home from "./components/Home/Home";
import About from "./components/about/About";
import Quizzes from "./components/quizzes/Quizzes";
import How from "./components/how/How";
import Scoreboard from "./components/account/Scoreboard";
import ChangePassword from "./components/account/ChangePasword";
import LoginPopUp from "./components/LoginPopUp/LoginPopUp";
import AddQuizForm from "./components/AddQuizForm/AddQuizForm";
import "./App.css";

const LoggedUserContext = createContext();

export function useLoggedUser() {
  return useContext(LoggedUserContext);
}

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [loggedWithGoogle, setLoggedWithGoogle] = useState(false);
  const [contentChoices, setContentChoices] = useState([
    { element: <Home goToQuizes={() => changePage("Quizzes")} />,text: "Home", active: true},
    { element: <How goToQuizes={() => changePage("Quizzes")} />, text: "How it works?", active: false},
    { element: <Quizzes />, text: "Quizzes", active: false },
    { element: <About />, text: "About us", active: false },
  ]);
  const [loggedChoices, setLoggedChoices] = useState([]);

  useEffect(() => {
    if (loggedUser) {
      const loggedChoices = [
        { element: <AddQuizForm />, text: "Add new quiz", active: false },
        { element: <Scoreboard changePage={changePage} />, text: "Scoreboard", active: false},
      ]
      if (!loggedWithGoogle) loggedChoices.push({ element: <ChangePassword />, text: "Change password", active: false })
      setContentChoices([...contentChoices, ...loggedChoices]);
      setLoggedChoices(loggedChoices);
    }
  }, [loggedUser]);

  const [content, setContent] = useState(findContent());
  const [modal, setModal] = useState(false);
  useEffect(() => {
    const userFromGoogle = getCookie("user");
    if (userFromGoogle) {
      setLoggedUser(userFromGoogle)
      setLoggedWithGoogle(true);
    };
  }, []);

  function getCookie(key) {
    const b = document.cookie.match("(^|;)\\s*" + key + "\\s*=\\s*([^;]+)");
    return b ? b.pop().replace("%40", "@") : null;
  }

  useEffect(() => {
    const newChoices = [...contentChoices];
    newChoices.forEach((choice) => (choice.active = false));
    newChoices.find((choice) => choice.element === content).active = true;
    setContentChoices(newChoices);
    sessionStorage.setItem(
      "currentContent",
      contentChoices.find((choice) => choice.active).text
    );
  }, [content]);

  function findContent() {
    const text = sessionStorage.getItem("currentContent");
    return contentChoices.find((choice) =>
      text === null ? choice.active : choice.text === text
    ).element;
  }

  function changePage(text) {
    if (text === "Quizzes" && !loggedUser) {
      setModal(true);
    } else {
      setContent(contentChoices.find((choice) => choice.text === text).element);
    }
  }

  const closeModal = () => {
    setModal(false);
  };

  const openModal = () => {
    setModal(true);
  };

  function loggUser(user) {
    setLoggedUser(user);
  }

  return (
    <LoggedUserContext.Provider value={{ loggedUser, setLoggedUser }}>
      <div className="App">
        <Header
          menuChoices={contentChoices.slice(0,4)}
          openModal={openModal}
          onLogoClick={() => changePage("Home")}
          changePage={changePage}
          dropdownChoices={loggedChoices}
        />
        <div id="content">
          {content}
          <LoginPopUp open={modal} close={closeModal} loggUser={loggUser} />
        </div>
      </div>
    </LoggedUserContext.Provider>
  );
}

export default App;
