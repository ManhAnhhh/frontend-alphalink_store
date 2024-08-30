import axios from "axios";
const Http = axios.create({
  baseURL: process.env.REACT_APP_BASE_API,
  withCredentials: true,
});

export default Http;