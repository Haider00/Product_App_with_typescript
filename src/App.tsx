import React, { useState } from "react";
import CreateaccountPage from "./CreateaccountPage";
import LoginPage from "./LoginPage";
import HomePage from "./HomePage";

interface AppState {
  currentPage: string;
  UserName: string;
  isLoggedIn: boolean;
  setCurrentPage: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

function App() {

  const [currentPage, setCurrentPage] = useState<string>("login");
  const [UserName, setUserName] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const appState: AppState = {
    currentPage,
    UserName,
    isLoggedIn,
    setCurrentPage,
    setUserName,
    setIsLoggedIn,
  };
  const renderPage = () => {
    if (currentPage === "createaccount") {
      return <CreateaccountPage appState={appState}/>;
    } else if (currentPage === "home") {
      return <HomePage appState={appState} />;
    } else if (currentPage === "login") {
      return <LoginPage appState={appState} />;
    }
  };

  return <div>{renderPage()}</div>;
}

export default App;

