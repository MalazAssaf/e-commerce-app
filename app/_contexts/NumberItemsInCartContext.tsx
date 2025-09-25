import { createContext } from "react";

interface CartContextType {
  itemsInCart: number;
  setItemsInCart: React.Dispatch<React.SetStateAction<number>>;
}

export const NumberItemsInCartContext = createContext<CartContextType | 0>(0);
