import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router";
import JoblyApi from "../api";
import { getCompanyorJobDataFromApi } from "../Helpers/helpers";
import Form from "../Form";
import "../Form.css";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** useFormHandler hook
 * 
 * Returns the initial state, a handleChange function that is 
 * used to update the form's state, and a handleSubmit function
 * that is used to reset form state, trigger API calls, and update state
 * in higher level components
 */
const useFormHandler = (initalState) => {
    const [formData, setFormData] = useState(initalState);

    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }));
    };

    const handleSubmit = (evt, setAppData) => {
        evt.preventDefault();
        const { action } = evt.target;
        if(!action.includes("signup")  && !action.includes("login") && !action.includes("profile")) {
            const isCompany = evt.target.action.includes("companies");
            const dataToSubmit = isCompany ? formData : { title: formData.name }
        
            setFormData(formData => initalState);
            setAppData(dataToSubmit);
        } else {
            setFormData(formData => initalState);
            setAppData(formData);
        };
    };

    return [formData, handleChange, handleSubmit];
};


/** useAppUpdate hook
 * 
 * The "brains" of the app component, used to determine if a user is logged in even when 
 * opening and closing a window, toggling the isLoggedIn state, and contains functions to get
 * user data from the JoblyApi class, set the user's username in state, and apply for jobs.
 * Many of these functions are then passed via useContext to other lower level components.
 */
const useAppUpdate = () => {
    const history = useHistory();

    const tokenIsPresent = window.localStorage.getItem("token") ? true : false;
    const _username = JSON.parse(window.localStorage.getItem("username")) || "";
    
    tokenIsPresent && (JoblyApi.token = JSON.parse(window.localStorage.getItem("token")));

    const [isLoggedIn, setIsLoggedIn] = useState(tokenIsPresent);
    const [username, setUsername] = useState(_username);
    const [userJobs, setUserJobs] = useState([]);
    const [userInfo, setUserInfo] = useState({
        firstName: "",
        lastName: "",
        email: ""
    });
    
    const toggleLoggedIn = (currentlyLoggedIn = null) => {
        setIsLoggedIn(isLoggedIn => !isLoggedIn);
        currentlyLoggedIn = !currentlyLoggedIn;
        if (!currentlyLoggedIn) {
            window.localStorage.removeItem("token");
            window.localStorage.removeItem("username");
            history.push("/login")
        };
    };

    const toggleUsername = (newUser) => {
        setUsername(username => newUser);
    };

    const getUserInfo = async(username) => {
        const { firstName, lastName, email, applications } = await JoblyApi.getUser(username);
        setUserJobs(userJobs => [...applications]);
        setUserInfo(userInfo => ({
            firstName,
            lastName,
            email
        }));
    };

    const applyForJob = async(username, jobId) => {
        await JoblyApi.applyForJobs(username, jobId);
        setUserJobs(userJobs => [...userJobs, jobId]);
    };

    useEffect(() => {
        async function fetchUserInfo(username) {
            if (username) {
                await getUserInfo(username);
            }
        };
        fetchUserInfo(username);
    },[username]);

    return [isLoggedIn, username, userJobs, userInfo, 
            toggleLoggedIn, toggleUsername, getUserInfo, applyForJob
        ];
};


/** useUserDataUpdate hook
 * 
 * The "brains" of the user side of the app. This section contains all of the functions and data that 
 * are used to set user data in state, log in a user, logout a user, and edit a user's profile. The path
 * parameter determines which choice is made within the conditional statement.
 */
const useUserDataUpdate = (path, toggleLoggedIn, toggleUsername, getUserInfo, userInfo, userName) => {
    const history = useHistory();
    const handleUserData = async(user) => {
        if (window.localStorage.getItem("token") !== null && path !== "/profile") return history.push("/companies");

        let result;
        const username = user.username || userName;
        if (path === "/signup") {
            result = await JoblyApi.register(user);
            history.push("/login");
        } else if (path === "/login") {
            result = await JoblyApi.login(user);
            toggleLoggedIn();
            toggleUsername(username);
            getUserInfo(username);
            window.localStorage.setItem("token", JSON.stringify(result));
            window.localStorage.setItem("username", JSON.stringify(username));
            history.push("/");
        } else {
            result = await JoblyApi.updateUser(username, user);
            getUserInfo(username);
            history.push("/companies");
        };
    };
    return [handleUserData];
};


/** useCompaniesAndJobsUpdate hook
 * 
 * The "brains" of the CompaniesAndJobs component. functions used to trigger API calls, obtain 
 * company and job data to render in cards, create a header for a specific company, and create a 
 * search form for each page.
 */
const useCompaniesAndJobsUpdate = (path, jobs, searchFormState, search, formStyle, placeholder) => {
    const { handle } = useParams();
    const [data, setData] = useState([]);
    const [companyInfo, setCompanyInfo] = useState({title: "", description: ""});

    useEffect(() => {
        async function getData() {
            let result = !handle ? await getCompanyorJobDataFromApi(path) : 
                                   await getCompanyorJobDataFromApi(path, handle);
            handle ? setData(data => [...result.jobs]) : setData(data => [...result]);
            const { name, description } = result;
            setCompanyInfo(companyInfo => ({ name, description }));
        };
        getData();
    },[path, handle]);


    const handleSearchForm = async(searchQuery) => {
        let result = !jobs ? await JoblyApi.getAllCompanies(searchQuery) : 
                             await JoblyApi.getAllJobs(searchQuery);
        
        setData(data => [...result]);
        const { name, description } = result;
        setCompanyInfo(companyInfo => ({ name, description }));
    };


    const addHeaderForCompany = () => {
        const { name, description } = companyInfo;
        return (
            <div className="CompaniesAndJobs-container">
                <h1>{name}</h1>
                <p>{description}</p>
            </div>
        );
    };

    const addSearchForm = () => {
        return (
            <div className="CompaniesAndJobs-container">
                <Form 
                    id="searchForm" 
                    initialState={searchFormState}  
                    labels={search} 
                    formStyle={formStyle} 
                    placeholder={placeholder}
                    setData={handleSearchForm}
                />
            </div>
        )
    };

    return [data, companyInfo, addHeaderForCompany, addSearchForm];
};

export {
    useFormHandler,
    useAppUpdate,
    useUserDataUpdate,
    useCompaniesAndJobsUpdate
};