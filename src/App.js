import routesItem from "./routes";
import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
// import share Component
import Header from "./share/components/layout/Header";
import Navigation from "./share/components/layout/Navigation";
import Footer from "./share/components/layout/Footer";
import Banner from "./share/components/layout/Banner";

import HeaderSkeleton from "./share/components/Skeleton/layout/HeaderSkeleton";
import NavigationSkeleton from "./share/components/Skeleton/layout/NavigationSkeleton";
import BannerSkeleton from "./share/components/Skeleton/layout/BannerSkeleton";
import FooterSkeleton from "./share/components/Skeleton/layout/FooterSkeleton";

import { LOADING_TIME } from "./share/utilities";

const Layout = ({ children }) => {
  const location = useLocation();
  const paths = ["/login", "/register"];
  const isLoginPage = paths.includes(location.pathname); // Thay "/login" bằng route cho trang đăng nhập
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, LOADING_TIME);
  }, []);
  return (
    <>
      {!isLoginPage && (isLoading ? <HeaderSkeleton /> : <Header />)}
      {!isLoginPage && (isLoading ? <NavigationSkeleton /> : <Navigation />)}
      <main>
        {!isLoginPage && (isLoading ? <BannerSkeleton /> : <Banner />)}
        {children}
      </main>
      {!isLoginPage && (isLoading ? <FooterSkeleton /> : <Footer />)}
      <ToastContainer pauseOnFocusLoss={false} closeOnClick />
    </>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {routesItem.map((route) => {
                return (
                  <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                  />
                );
              })}
              <Route />
            </Routes>
          </Layout>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
