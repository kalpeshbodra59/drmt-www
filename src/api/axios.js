import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://sore-gold-adder-tutu.cyclic.app/api",
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // if (error.response) {
    //   // Handle HTTP errors
    // } else if (error.request) {
    //   // Handle network errors
    // } else {
    //   // Handle other errors
    // }
    return error.response;
  }
);

export default axiosInstance;
