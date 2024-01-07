import axios from "axios";
import { getToken } from "./firebase";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const signInUser = async (idToken) => {
  try {
    const { data } = await api.post("auth/", {
      idToken,
    });

    return data;
  } catch (e) {
    return null;
  }
};
