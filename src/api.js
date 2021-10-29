import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interacting with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all companies. */
  static async getAllCompanies(searchQuery = {}) {
    let res = await this.request("companies", searchQuery);
    return res.companies;
  };

  /** Get details on all jobs. */
  static async getAllJobs(searchQuery = {}) {
    let res = await this.request("jobs", searchQuery);
    return res.jobs;
  };

  /** Allow a user to login if they have created an account. */
  static async login({ username, password }) {
    let res = await this.request("auth/token", {username, password}, "post");
    this.token = res.token;
    return res.token;
  };

  /** Allow a user to register on the site. */
  static async register(user) {
    let res = await this.request("auth/register", user, "post");
    return res.token;
  };

  /** Allow a logged in user to edit their profile. */
  static async editProfile(username, updatedUser) {
    let res = await this.request(`users/${username}`, updatedUser, "patch");
    return res.user;
  };
  
  /** Used to get data about a logged in user. */
  static async getUser(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  };

  /** Used to update a logged in user. */
  static async updateUser(username, user) {
    let res = await this.request(`users/${username}`, user, "patch");
    return res.user;
  };

  /** Used to allow a logged in user to apply for jobs. */
  static async applyForJobs(username, jobId) {
    if (username === undefined || jobId === undefined) return;
    let res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res.applied;
  };
};

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


export default JoblyApi;