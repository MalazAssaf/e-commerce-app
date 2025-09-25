import order from "@/strapi/e-commerce-app/src/api/order/controllers/order";
import axios, { AxiosInstance } from "axios";
import { toast } from "sonner";

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

export interface User {
  id: number;
  username?: string;
  email?: string;
  [key: string]: unknown;
}

export interface Login {
  email: string;
  password: string | number;
}

export interface CartItemsListInterface {
  id: number;
  quantity: number;
  amount: number;
  products: Product[];
}
export interface OrderItemList {
  quantity: number;
  amount: number;
  product: Product;
}
export interface Order {
  id: number | string;
  totalOrderAmount: number;
  orderItemList: OrderItemList[];
  createdAt: string;
  [key: string]: unknown;
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

const addToCart = (data: { [key: string]: unknown }, jwt: string) =>
  axiosGlobal.post("/user-carts", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getCartItems = (userId: string | number, jwt: string) =>
  axiosGlobal
    .get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&[populate][products][populate]=image",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((resp) => {
      const data = resp.data.data;
      const cartItemList = data.map((item: CartItemsListInterface) => {
        const product = item?.products[0];
        return {
          name: product?.name,
          quantity: item?.quantity,
          amount: item?.amount,
          image: product.image[0]?.url,
          sellingPrice: product?.sellingPrice,
          id: item.id,
          product: product.id,
        };
      });
      return cartItemList;
    });

const getCartItemsList = (
  userId: string | number,
  jwt: string
): Promise<CartItemsListInterface[]> =>
  axiosGlobal
    .get(
      "/user-carts?filters[userId][$eq]=" +
        userId +
        "&[populate][products][populate]=image",
      {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      }
    )
    .then((response) => {
      return response.data.data as CartItemsListInterface[];
    });

// Not Working!
const deleteCartItem = async (id: number, jwt: string) => {
  try {
    const res = await axiosGlobal.delete(`/user-carts/${id}`, {
      headers: {
        Authorization: "Bearer " + jwt,
      },
    });
    return res;
  } catch (e) {
    console.error("Delete error:", e);
    toast.error("An error occurred");
    throw e;
  }
};

const createOrder = (data: { [key: string]: unknown }, jwt: string) =>
  axiosGlobal.post("/orders", data, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

const getOrders = (userId: string | number) =>
  axiosGlobal
    .get(
      "http://localhost:1337/api/orders?[userId][$eq]=" +
        userId +
        "&[populate][orderItemList][populate][product][populate]=image"
    )
    .then((resp) => {
      const response = resp.data.data;
      const orderList = response.map((item: Order) => ({
        id: item.id,
        totalOrderAmount: item.totalOrderAmount,
        orderItemList: item.orderItemList,
        createdAt: item.createdAt,
      }));
      return orderList;
    });

export default {
  getSliders,
  getCategoryList,
  getProductList,
  getProductByCategory,
  registerNewUser,
  signIn,
  addToCart,
  getCartItems,
  getCartItemsList,
  deleteCartItem,
  createOrder,
  getOrders,
};
