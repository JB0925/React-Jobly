import React from "react";
import Navbar from "./Navbar";
import Routes from "./Routes";
import './App.css';
import { useAppUpdate } from "./Hooks/hooks";
import AppContext from "./AppContext";


/** App Component
 * 
 * The main component and the "brains" of the app.
 * 
 * Hooks:
 *    - useAppUpdate:
 *        - returns an array of user data and functions used to update state
 *        - these items are passed, mainly via the useContext hook, to other 
 *          components within the app.
 */
function App() {
  const [isLoggedIn, username, userJobs, userInfo, toggleLoggedIn, toggleUsername, getUserInfo, applyForJob] = useAppUpdate();
  const value = {
    isLoggedIn,
    username,
    userJobs,
    userInfo,
    toggleLoggedIn,
    toggleUsername,
    getUserInfo,
    applyForJob
  };
  
  return (
    <AppContext.Provider value={value}>
      <div className="App">
        <Navbar />
        <Routes />
      </div>
    </AppContext.Provider>
  );
}

export default App;
