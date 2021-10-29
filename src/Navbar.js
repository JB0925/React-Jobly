import React, { useContext } from "react";
import "./Navbar.css";
import { NavLink, Link } from "react-router-dom";
import AppContext from "./AppContext";


/** Navbar Component
 * 
 * Variables:
 *      - isLoggedIn, toggleLoggedIn, username
 *        used to determine which views to show in the Navbar,
 *        and what user information to display
 */
const Navbar = () => {
    const { isLoggedIn, toggleLoggedIn, username } = useContext(AppContext);
    return (
        !isLoggedIn ?
        <nav>
            <Link to="/" id="homeLink">Jobly</Link>
            <ul>
                <li><NavLink to="/login" activeClassName="activeLink">Login</NavLink></li>
                <li><NavLink to="/signup" activeClassName="activeLink">Sign Up</NavLink></li>
            </ul>
        </nav>
        :
        <nav>
            <Link to="/" id="homeLink">Jobly</Link>
            <ul>
                <li><NavLink to="/companies" activeClassName="activeLink">Companies</NavLink></li>
                <li><NavLink to="/jobs" activeClassName="activeLink">Jobs</NavLink></li>
                <li><NavLink to="/profile" activeClassName="activeLink">Profile</NavLink></li>
                <li><NavLink to="/" onClick={() => toggleLoggedIn(isLoggedIn)} >Log Out {username}</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;