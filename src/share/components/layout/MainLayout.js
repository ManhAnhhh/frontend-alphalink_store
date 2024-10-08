import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import Header from "./Header";
import Banner from "./Banner";
import Footer from "./Footer";
import Navigation from "./Navigation";

import HeaderSkeleton from "../Skeleton/layout/HeaderSkeleton";
import BannerSkeleton from "../Skeleton/layout/BannerSkeleton";
import FooterSkeleton from "../Skeleton/layout/FooterSkeleton";
import NavigationSkeleton from "../Skeleton/layout/NavigationSkeleton";

const MainLayout = () => {
  const isLoading = useSelector((state) => state.Loading.isLoading);
  //? Chỉ có home page and category page là có Banner
  const location = useLocation();
  const pathUsed = ["/category"];

  const shouldDisplayBanner = () => {
    if (location.pathname === "/") return true;
    return pathUsed.some((path) => location.pathname.startsWith(path));
  };

  // Outlet là nơi chứa chilren trong react-router-dom
  // tức là chứa các pages
  return (
    <>
      {isLoading ? <HeaderSkeleton /> : <Header />}
      {isLoading ? <NavigationSkeleton /> : <Navigation />}
      {isLoading ? <BannerSkeleton /> : shouldDisplayBanner() && <Banner />}
      <Outlet />
      {isLoading ? <FooterSkeleton /> : <Footer />}
    </>
  );
};

export default MainLayout;
