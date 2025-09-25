import { createContext } from "react";
import { CartItemsListInterface } from "../_utils/Api";
interface ItemsInCartContextType {
  itemsCartList: CartItemsListInterface[];
  setItemsCartList: React.Dispatch<
    React.SetStateAction<CartItemsListInterface[]>
  >;
}

export const ItemsInCartContext = createContext<ItemsInCartContextType | null>(
  null
);
