import axios from "axios";

const privateKey: any = import.meta.env.VITE_API_KEY;

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  params: {
    api_key: privateKey,
  },
});

export default api;
