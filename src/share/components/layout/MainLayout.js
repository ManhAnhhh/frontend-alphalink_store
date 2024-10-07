import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import Navigation from "./Navigation";

const MainLayout = () => {
  //? Chỉ có home page and category page là có Banner
  const location = useLocation();
  const pathUsed = ["/category"];

  const isCheckPath = () => {
    if (location.pathname === "/") return true;
    return pathUsed.some((path) => location.pathname.startsWith(path));
  };

  // Outlet là nơi chứa chilren trong react-router-dom
  // tức là chứa các pages
  return (
    <>
      <Header />
      <Navigation />
      {isCheckPath() && <Banner />}
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
