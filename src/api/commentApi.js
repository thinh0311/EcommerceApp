import React from "react";
import axiosClient from "./ApiConfig";

const commentApi = {
  getAllComment: () => {
    const url = "/BinhLuan";
    return axiosClient.get(url);
  },
  getBySanPham: (idsp) => {
    const url = `/BinhLuan/GetBinhLuanBySanPham/${idsp}`;
    return axiosClient.get(url);
  },
  addComment: (data) => {
    const url = `/BinhLuan`;
    return axiosClient.post(url, data);
  },
  updateComment: (id, data) => {
    const url = `/BinhLuan/${id}`;
    return axiosClient.put(url, data);
  },
  deleteComment: (id) => {
    const url = `/BinhLuan/${id}`;
    return axiosClient.delete(url);
  },
};

export default commentApi;
