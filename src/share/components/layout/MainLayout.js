import React from "react";
import { Outlet } from "react-router-dom";

import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import Navigation from "./Navigation";

const MainLayout = () => {
  // Outlet là nơi chứa chilren trong react-router-dom
  // tức là chứa các pages
  return (
    <>
      <Header />
      <Navigation />
      <Banner />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
