import axios, { AxiosInstance } from "axios";

const axiosGlobal: AxiosInstance = axios.create({
  baseURL: "http://localhost:1337/api",
});

interface ImageData {
  id: number;
  url: string;
  [key: string]: unknown;
}

export interface Category {
  id: number;
  documentId: string;
  name: string;
  color: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  icon: ImageData[];
  [key: string]: unknown;
}

export interface Slider {
  name: string;
  id: number;
  image: ImageData[];
  [key: string]: unknown;
}

export interface Product {
  id: number;
  name: string;
  realPrice: number;
  sellingPrice: number;
  description: string;
  categories: Category[];
  image: ImageData[];
  [key: string]: unknown;
}

export interface UserInfo {
  username: string;
  email: string;
  password: string | number;
}

export interface Login {
  email: string;
  password: string | number;
}

export const getCategoryList = (): Promise<Category[]> =>
  axiosGlobal.get("/categories?populate=*").then((response) => {
    return response.data.data as Category[];
  });

const getSliders = (): Promise<Slider[]> =>
  axiosGlobal.get("/sliders/?populate=*").then((response) => {
    return response.data.data as Slider[];
  });

const getProductList = (): Promise<Product[]> =>
  axiosGlobal.get("/products?populate=*").then((response) => {
    return response.data.data as Product[];
  });

const getProductByCategory = (category: string): Promise<Product[]> =>
  axiosGlobal
    .get(`/products?filters[productType][$in]=${category}&populate=*`)
    .then((response) => {
      return response.data.data as Product[];
    });

const registerNewUser = (userData: UserInfo) =>
  axiosGlobal.post("/auth/local/register", {
    username: userData.username,
    email: userData.email,
    password: userData.password,
  });

const signIn = (userData: Login) =>
  axiosGlobal.post("/auth/local", {
    identifier: userData.email,
    password: userData.password,
  });

export default {
  getSliders,
  getCategoryList,
  getProductList,
  getProductByCategory,
  registerNewUser,
  signIn,
};
