import React from "react";
import { useFormHandler } from "./Hooks/hooks";
import Button from "./Button";
import "./Form.css";


/** Form Component
 * 
 * A reusable form component that renders the login, signup, profile, and search forms
 * 
 * This component takes in initialState to set the form's state, labels to add to the form,
 * an optional style component (used in the search form) placeholders for the inputs, and a "setData"
 * function that is used to update state in the App component, CompaniesAndJobs component, etc., and
 * to make API calls.
 */
const Form = ({ initialState, labels, formStyle = {}, placeholder = "", setData = null }) => {
    const [formData, handleChange, handleSubmit] = useFormHandler(initialState);
    const keys = Object.keys(initialState);
    const values = Object.values(labels)

    const createFormParts = keys.map((key, idx) => {
        return (
            <>
              <label htmlFor={values[idx]}>{values[idx]}</label>
              <input 
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                type={key === "password" ? "password" : "text"}
                placeholder={placeholder}
                required
              />
            </>
        );
    });

    return (
        <form onSubmit={async(evt) => handleSubmit(evt, setData, formData)} style={formStyle}>
            {createFormParts}
            <Button />
        </form>
    );
};

export default Form;