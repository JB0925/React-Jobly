import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "./AppContext";
import "./Button.css";


/** Button Component
 * 
 * Renders a button with an optional background color, optional text, and has a "to"
 * prop that is used if the button wraps a Link component from react-router-dom.
 * 
 * Also takes an id which is used to apply for jobs.
 */
const Button = ({ to = null, text = "Submit", backgroundColor = "dodgerblue", id }) => {
    const { username, applyForJob } = useContext(AppContext);
    const styleObject = {
        backgroundColor,
        border: `1px solid ${backgroundColor}`
    };

    return (
        to == null ?
        <button className="formButton" type="submit" onClick={async() => await applyForJob(username, id)}>{text}</button>
        :
        <button className="button" style={styleObject}><Link to={to}>{text}</Link></button>
    );
};

export default Button;