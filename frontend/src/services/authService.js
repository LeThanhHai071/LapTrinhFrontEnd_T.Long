import axios from "axios";

export const register = (data) => {
  return axios.post("/api/auth/register", data);
};

export const login = (data) => {
  return axios.post("/api/auth/login", data);
};
