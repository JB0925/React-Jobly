import React, { useContext } from "react";
import Button from "./Button";
import "./Card.css";
import images from "./Helpers/images";
import { Link } from "react-router-dom";
import AppContext from "./AppContext";


/** Card Component
 * 
 * The card that gets rendered for job and company data
 * 
 * Params:
 *      - data: the data that gets displayed on the card
 *      - id: the job id that is used to display on the job cards
 *      - jobs: a boolean that is used to determine if the card should
 *              display job data or company data
 * 
 * Context:
 *      - userJobs, from the App component, is used to determine whether
 *        a job's button says "Apply" or "Applied" by determining whether
 *        the id is in the user's jobs array.
 */
const Card = ({ data, id, jobs = false }) => {
    const { userJobs } = useContext(AppContext);
    const getRandomLogo = () => {
        const randomIdx = Math.floor(Math.random() * images.length);
        return images[randomIdx];
    };
    
    return (
        !jobs ?
        <Link to={`/companies/${data.handle}`} className="Card">
            <div className="Card-row">
                <h2>{data.name}</h2>
                <div className="Card-image">
                    <img src={getRandomLogo()} alt={data.name}></img>
                </div>
            </div>
            <div className="Card-row">
                <p>{data.description}</p>
            </div>
        </Link>
        :
        <div className="Card">
            <div className="Card-jobcard">
                <h2>{data.title}</h2>
                <h3>{data.companyName}</h3>
            </div>
            <div className="Card-jobcard">
                <p>Salary: {data.salary}</p>
                <p>Equity: {data.equity}</p>
            </div>
            <Button text={userJobs.includes(id) ? "Applied" : "Apply"} backgroundColor="red" id={id} />
        </div>
    );
};

export default Card;