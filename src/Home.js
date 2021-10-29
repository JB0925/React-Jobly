import React, { useContext } from "react";
import AppContext from "./AppContext";
import Button from "./Button";
import "./Home.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** HomePage Component
 * 
 * Renders the home page, withc an optional render depending on 
 * whether or not the user is logged in.
 */
const HomePage = () => {
    const { isLoggedIn } = useContext(AppContext);
    const optionalRender = () => {
        const username = JSON.parse(window.localStorage.getItem("username")) || "";
        return (
            isLoggedIn ?
            <h2>Welcome Back, {username}!</h2>
            :
            <div className="Home-buttons">
                <Button to="/login" text="Login" backgroundColor="dodgerblue" />
                <Button to="/signup" text="Sign Up" backgroundColor="dodgerblue" />
            </div>
        )
    };

    return (
        <div className="Home">
            <h1>Jobly</h1>
            <p>All the jobs in one convenient place.</p>
            {optionalRender()}
        </div>
    )
};

export default HomePage;