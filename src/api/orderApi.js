import axiosClient from "./ApiConfig";

const accountApi = {
  getAll: () => {
    const url = `/DonDatHang`;
    return axiosClient.get(url);
  },
  getOrder: (maKH) => {
    const url = `/DonDatHang/GetDonHangByKhachHang/${maKH}`;
    return axiosClient.get(url);
  },
  getDetailOrder: (maDH) => {
    const url = `/CTDDH/${maDH}`;
    return axiosClient.get(url);
  },
  addOrder: (data) => {
    const url = `/DonDatHang`;
    return axiosClient.post(url, data);
  },
  deleteOrder: (maDH) => {
    const url = `/DonDatHang/${maDH}`;
    return axiosClient.delete(url);
  },
  updateOrder: (maDH, data) => {
    const url = `/DonDatHang/${maDH}`;
    return axiosClient.put(url, data);
  },
};

export default accountApi;
