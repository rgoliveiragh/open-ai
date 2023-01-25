import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const headers = { Authorization: `Bearer ${apiKey}` };

const axiosInstance = axios.create({
  baseURL: "https://api.openai.com/v1/engines/davinci/completions",
  headers,
});

export default axiosInstance;
