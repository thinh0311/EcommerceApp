import axiosClient from "./ApiConfig";

const accountApi = {
  getAll: () => {
    const url = "/User";
    return axiosClient.get(url);
  },
  getAccount: (token) => {
    const url = `/User/${token}`;
    return axiosClient.get(url);
  },
  getLogin: (email, password) => {
    const url = `/User/GetUserByLogin/${email}/${password}`;
    return axiosClient.get(url);
  },
  checkAccount: (account) => {
    const url = `/User/CheckTaiKhoan/${account}`;
    return axiosClient.get(url);
  },
  updateAccount: (token, data) => {
    const url = `/User/${token}`;
    return axiosClient.put(url, data);
  },
  addAccount: (data) => {
    const url = `/User`;
    return axiosClient.post(url, data);
  },
};

export default accountApi;
