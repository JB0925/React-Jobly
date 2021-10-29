import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./Home";
import UserInfo from "./UserInfo";
import CompaniesAndJobs from "./CompaniesAndJobs";
import { initialFormStates, formLabels, searchFormStyle } from "./Helpers/helpers";
import AppContext from "./AppContext";

/** All of the routes for the app component for Jobly.
 * 
 * variables: 
 *      - loginFormState, signupFormState: the initial states for those 
 *        respective form components
 *      - formLabels: all of the labels for the form component
 *      - userInfo: information about the currently logged in user. 
 *            { firstName, lastName, email }
 * 
 * routes:
 *      - homepage
 *      - signup / register
 *      - login
 *      - companies
 *      - jobs
 *      - jobs for a specific company
 *      - user profile
 *      - redirect component for any routes that don't have a match
 */

const Routes = () => {
    const { loginFormState, signupFormState } = initialFormStates[0];
    const { username, password, firstName, lastName, email, confirm } = formLabels;
    const { userInfo } = useContext(AppContext);

    return (
        <Switch>
            <Route exact path="/">
                <HomePage />
            </Route>
            <Route exact path="/signup">
                <UserInfo 
                    initialState={signupFormState} 
                    formLabels={{username, password, firstName, lastName, email}}
                    title="Sign Up"
                    path="/signup"
                 />
            </Route>
            <Route exact path="/login">
                <UserInfo
                    initialState={loginFormState}
                    formLabels={{username, password}}
                    title="Login"
                    path="/login"
                />
            </Route>
            <Route exact path="/companies">
                <CompaniesAndJobs 
                    formStyle={searchFormStyle}
                    placeholder="Enter a Search"    
                    path="/companies"
                />
            </Route>
            <Route exact path="/jobs">
                <CompaniesAndJobs
                    formStyle={searchFormStyle}
                    placeholder="Enter a Search"
                    path="/jobs"
                    jobs={true}    
                />
            </Route>
            <Route path="/companies/:handle">
                <CompaniesAndJobs
                    path="/companies/:handle"
                    jobs={true}
                />
            </Route>
            <Route exact path="/profile">
                <UserInfo 
                    initialState={userInfo}
                    formLabels={{firstName, lastName, email, confirm}}
                    title="Profile"
                    path="/profile"
                />
            </Route>
            <Redirect to="/" />
        </Switch>
    );
};

export default Routes;