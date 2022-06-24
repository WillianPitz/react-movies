import api from "../api";
import { AxiosRequestConfig, AxiosResponse } from "axios";

const getMovies = (url: string, config: AxiosRequestConfig) => {
  return api.get(url, config);
};

export default {
  getMovies,
};
