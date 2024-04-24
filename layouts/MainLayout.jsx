import { Raleway } from "next/font/google";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const raleway = Raleway({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-raleway",
});

const MainLayout = ({ children }) => {
  return (
    <div
      className={`${raleway.variable} font-sans bg-primary-gray min-h-screen w-screen text-black-primary`}
    >
      <div className="container mx-auto pt-4">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
