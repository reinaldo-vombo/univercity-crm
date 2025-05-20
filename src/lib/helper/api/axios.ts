import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // use env for flexibility
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
