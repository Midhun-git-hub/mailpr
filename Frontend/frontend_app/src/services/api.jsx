import axios from "axios";

const API = axios.create({
    baseURL: "https://mailpr.onrender.com/api/",  // Django backend
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("access"); // or whatever key you're using

    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
});

export default API;
