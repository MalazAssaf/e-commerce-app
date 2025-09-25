import { createContext } from "react";

interface CartContextType {
  updateCart: boolean;
  setUpdateCart: React.Dispatch<React.SetStateAction<boolean>>;
}
export const CartContext = createContext<CartContextType | null>(null);
