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
  return (
    <html lang="en">
      <body
        className={`${outfit.className} ${geistMono.className} antialiased`}
      >
        <Provider store={store}>
          <Header />
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
