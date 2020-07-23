import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost",
  // withCredentials: true,
  headers: {
    "Content-type": "application/json",
    accept: "application/json",
  },
});

export default api;
