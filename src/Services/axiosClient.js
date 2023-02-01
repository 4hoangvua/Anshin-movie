import axios from "axios";
import store from "../store";
// setup cau hinh mac dinh cho axios
const axiosClient = axios.create({
  baseURL: "https://movienew.cybersoft.edu.vn/api",
  headers: {
    TokenCybersoft: process.env.REACT_APP_TOKEN_CYBERSOFT,
  },
});
axiosClient.interceptors.request.use((config) => {
  if (config.headers) {
    const { accessToken } = store.getState().sig?.userLogin || {};
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
});
axiosClient.interceptors.response.use(
  (reponse) => {
    return reponse.data.content;
  },
  (error) => {
    return Promise.reject(error.response.data.content);
  }
);

export default axiosClient;
