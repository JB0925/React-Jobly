import React, { useContext } from "react";
import AppContext from "./AppContext";
import Form from "./Form";
import { useUserDataUpdate } from "./Hooks/hooks";
import "./UserInfo.css";

/** UserInfo Component
 * 
 * Props:
 *      - initialState: the initial form state
 *      - formLabels: the labels for each given form
 *      - title: the form's title
 *      - path: the path, such as "/login", etc., that allows for conditional
 *        rendering of this reusable component
 * 
 * Context:
 *      - toggleLoggedIn, toggleUsername, getUserInfo: functions that set the login state of
 *        a user, and set the user data in state for other components to access
 *      - userInfo, username: data from state used to make calls to the backend API
 * 
 * Hooks:
 *      - useUserDataUpdate:
 *          - returns a function, handleUserData, that takes in all of the above as args
 *          - handleUserData is passed to the form so that when it is submitted, state is updated
 *            in the app component
 */
const UserInfo = ({ initialState, formLabels, title, path }) => {
    const { toggleLoggedIn, toggleUsername, getUserInfo, userInfo, username } = useContext(AppContext);
    const [handleUserData] = useUserDataUpdate(path, toggleLoggedIn, toggleUsername, getUserInfo, userInfo, username);
    
    return (
        <div className="UserInfo">
            <div className="UserInfo-container">
                <h1>{title}</h1>
                <Form initialState={initialState} labels={formLabels} setData={handleUserData} />
            </div>
        </div>
    )
};

export default UserInfo;