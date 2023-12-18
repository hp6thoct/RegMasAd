// Api/AccountController.js
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users/login"; // Replace with your API base URL

const login = async (username, password) => {
  return axios.get(BASE_URL, {
    params: {
      username: username,
      password: password,
    },
  });
};

export { login };
