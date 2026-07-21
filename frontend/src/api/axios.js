import axios from "axios";

const API = axios.create({
    baseURL: "https://netflix-clone-fullstack-fi2n.onrender.com",
});

export default API;