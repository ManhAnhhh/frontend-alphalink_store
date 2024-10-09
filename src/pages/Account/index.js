import { Outlet } from "react-router-dom";

import SideBar from "./layout/SideBar";
import Header from "../../share/components/layout/Header";
import Footer from "../../share/components/layout/Footer";
import Navigation from "./layout/Navigation";

const index = () => {
  return (
    <>
      <Header />
      <Navigation />
      <div className="container-fluid">
        <div className="d-flex gap-2">
          <SideBar />
          <div className="w-100 mt-2 mt-md-0">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;
