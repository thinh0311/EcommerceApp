import React from "react";
import axiosClient from "./ApiConfig";

const productApi = {
  getAll: () => {
    const url = "/SanPham";
    return axiosClient.get(url);
  },
  getProductsByCategory: (idCategory) => {
    const url = `/SanPham/GetSanPhamByMaLoaiNuoc/${idCategory}`;
    return axiosClient.get(url);
  },
  getProductsById: (idProduct) => {
    const url = `/SanPham/${idProduct}`;
    return axiosClient.get(url);
  },
  getProductsPromote: (idProduct) => {
    const url = `/SanPham/GetSanPhamSaleKhung`;
    return axiosClient.get(url);
  },
  getProductsSelling: () => {
    const url = `/SanPham/GetSanPhamBanChay`;
    return axiosClient.get(url);
  },
  isGiamGia: (idProduct) => {
    const url = `/SanPham/IsGiamGia/${idProduct}`;
    return axiosClient.get(url);
  },
  getGiamGia: (idProduct) => {
    const url = `/SanPham/GetGiamGia/${idProduct}`;
    return axiosClient.get(url);
  },
  searchProduct: (text) => {
    const url = `/SanPham/TimKiemSanPham/${text}`;
    return axiosClient.get(url);
  },
  addProduct: (data) => {
    const url = `/SanPham`;
    return axiosClient.post(url, data);
  },
  addCloudinary: () => {
    const url = `/Cloudinary`;
    return axiosClient.get(url);
  },
  updateProduct: (idProduct, data) => {
    const url = `/SanPham/${idProduct}`;
    return axiosClient.put(url, data);
  },
  deleteProduct: (idProduct) => {
    const url = `/SanPham/${idProduct}`;
    return axiosClient.delete(url);
  },
  getDiscount: (idProduct) => {
    const url = `/SanPham/GetKMSanPham/${idProduct}`;
    return axiosClient.get(url);
  },
};

export default productApi;
