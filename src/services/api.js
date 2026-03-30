import axios from "axios";

const API = axios.create({
  baseURL: "https://attendance-backend-i3wn.onrender.com"
});

export default API;