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
      className={`${raleway.variable} font-sans bg-primary-gray text-black-primary min-h-screen w-full p-2 lg:p-6`}
    >
      <div className="max-w-2xl mx-auto pt-4">
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;
