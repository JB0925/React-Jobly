import React, { useContext } from "react";
import "./CompaniesAndJobs.css";
import Card from "./Card";
import { v4 as uuid } from "uuid";
import { initialFormStates, formLabels } from "./Helpers/helpers";
import { useCompaniesAndJobsUpdate } from "./Hooks/hooks";
import { Redirect } from "react-router-dom";
import AppContext from "./AppContext";


/** CompaniesAndJobs Component
 * 
 * The CompaniesAndJobs component can render three different views:
 *      1). Companies: filled with Company cards with company logos
 *      2). Jobs: Filled with all available jobs and a button to apply
 *      3). Jobs for a specific company: See #2, but for only one company.
 * 
 * Variables:
 *      isLoggedIn: used to determine whether or not to protect the view from 
 *                  the user
 *      search, searchFormState: same as other forms; passing labels and initial state
 *                               to the search form 
 *      data, companyInfo addHeaderForCompany, addSearchForm:
 *              used in the useCompaniesAndJobsUpdate hook. This hook is used to determine what
 *              to show the user and which API calls to make based on the path passed in as a prop,
 *              whether we the user wants to see Company data, job data, or a specific company's jobs.
 */
const CompaniesAndJobs = ({ formStyle = null, placeholder = "", jobs = false, path = "" }) => {
    const { isLoggedIn } = useContext(AppContext)

    const { searchFormState } = initialFormStates[0];
    const { search } = formLabels;
    const [data, companyInfo, addHeaderForCompany, addSearchForm] = 
            useCompaniesAndJobsUpdate(path, jobs, searchFormState, search, formStyle, placeholder);

    
    const renderCards = data.map(d => <Card data={d} key={uuid()} jobs={jobs} id={d.id} />);
    return (
        !isLoggedIn ?
        <Redirect to="/login" />
        :
        <div className="CompaniesAndJobs">
            {companyInfo && addHeaderForCompany()}
            {formStyle && addSearchForm()}
            {renderCards}
        </div>
    );
};

export default CompaniesAndJobs;