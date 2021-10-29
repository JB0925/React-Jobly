import JoblyApi from "../api";
const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";
/** An array of objects that contains the initial form states
 * for the login, signup, and search forms.
 */
const initialFormStates = [
    {
        loginFormState: {
            username: "",
            password: ""
        },
            
        signupFormState: {
            username: "",
            password: "",
            firstName: "",
            lastName: "",
            email: ""
        },

        searchFormState: {
            name: ""
        }
    }
];

/** An object used to send form labels to each component that has a form */
const formLabels = {
    username: "Username",
    password: "Password",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    confirm: "Confirm password to make changes:",
    search: ""
};

// A style object for the search form.
const searchFormStyle = {
    flexDirection: "row",
    width: "100%",
    border: "none",
    padding: "0",
    marginTop: "50px",
    marginBottom: "20px",
}

// Helper function that determines which API endpoint to call based on the path and or handle passed in
const getCompanyorJobDataFromApi = async(path, handle = null) => {
    if (path === "/companies") return await JoblyApi.getAllCompanies();
    if (path === "/companies/:handle") return await JoblyApi.getCompany(handle);
    if (path === "/jobs") return await JoblyApi.getAllJobs();
};

export { initialFormStates, formLabels, searchFormStyle, getCompanyorJobDataFromApi };