import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "http://drinkstore0311.somee.com/api",
  // headers: {
  //   // Authentication: "api Key",
  // },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
