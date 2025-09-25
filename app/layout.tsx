"use client";

// UI COMPONETNS
import { Toaster } from "@/components/ui/sonner";
import { Outfit, Geist_Mono } from "next/font/google";
import "./globals.css";

// REACT & REDUX
import { Provider } from "react-redux";
import { store } from "../store/store";

// OTHERS
import Header from "./_components/Header";
import { usePathname } from "next/navigation";
import { CartContext } from "./_contexts/CartContext";
import { useState } from "react";
import { NumberItemsInCartContext } from "./_contexts/NumberItemsInCartContext";
import { ItemsInCartContext } from "./_contexts/ItemsInCartContext";
import { CartItemsListInterface } from "./_utils/Api";
import ClientLoaderWrapper from "./_components/ClientLoaderWrapper";

const outfit = Outfit({ subsets: ["latin"] });

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = usePathname();
  const showHeader =
    params === "/sign-in" || params === "/create-account" ? false : true;
  const [updateCart, setUpdateCart] = useState(false);
  const [itemsCartList, setItemsCartList] = useState<CartItemsListInterface[]>(
    []
  );
  const [itemsInCart, setItemsInCart] = useState(0);
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${geistMono.className} antialiased`}
      >
        <Provider store={store}>
          <CartContext.Provider value={{ updateCart, setUpdateCart }}>
            <ItemsInCartContext.Provider
              value={{ itemsCartList, setItemsCartList }}
            >
              <NumberItemsInCartContext.Provider
                value={{ itemsInCart, setItemsInCart }}
              >
                {showHeader && <Header />}
                <ClientLoaderWrapper>{children}</ClientLoaderWrapper>{" "}
                <Toaster />
              </NumberItemsInCartContext.Provider>
            </ItemsInCartContext.Provider>
          </CartContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
