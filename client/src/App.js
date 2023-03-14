import "./App.css";
import Header from "./components/header/Header";
import Welcome from "./components/welcome/Welcome";
import About from "./components/about/About";
import { useEffect, useState } from "react";
import Quizzes from "./components/quizzes/Quizzes";
import How from "./components/how/How";

function App() {
  const [menuChoices, setMenuChoices] = useState([
    { element: <Welcome goToQuizes={() => changePage('Quizzes')}/>, text: "Welcome", active: true},
    { element: <How goToQuizes={() => changePage('Quizzes')}/>, text: "How it works?", active: false },
    { element: <Quizzes/>, text: "Quizzes", active: false },
    { element: <About />, text: "About us", active: false }
  ]);
  const [content, setContent] = useState(findContent());
  
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

  return (
    <div className="App">
      <Header menuChoices={menuChoices} onLogoClick={() => changePage('Welcome')} changePage={(e) => changePage(e.target.textContent)} />
      <div id="content">{content}</div>
    </div>
  );
}

export default App;
