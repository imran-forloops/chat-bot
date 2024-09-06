import { Inter } from "next/font/google";
import localFont from "next/font/local";
import classNames from "classnames";
import { MessagesProvider } from "./context/MessagesContext";
import { ToastContainer } from "react-toastify";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });
const favorit = localFont({
  src: "./fonts/ABCFavorit-Bold.woff2",
  variable: "--font-favorit",
});

export const viewport = {
  themeColor: "#000000",
  initialScale: 1,
  width: "device-width",
  maximumScale: 1,
  userScalable: false,
};

export const metadata = {
  title: "forloops.co",
  description: "Powered by forloops.co",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, user-scalable=no" />
      </head>
      <body
        className={`h-full ${classNames(favorit.variable, inter.className)}`}
      >
        <ToastContainer />
        <MessagesProvider>{children}</MessagesProvider>
      </body>
    </html>
  );
}
