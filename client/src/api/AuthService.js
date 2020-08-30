import axios from "../utils/axiosClient";

export function requestSignup(userDetails) {
  return axios.post("signup", userDetails);
};


export function requestLogin(userInfo){
  return axios.post("login", userInfo);
};