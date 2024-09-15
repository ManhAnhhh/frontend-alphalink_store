import publicRoutes from "./routes";
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

const Layout = ({ children }) => {
  const location = useLocation();
  const paths = ["/login", "/register"];
  const isLoginPage = paths.includes(location.pathname); // Thay "/login" bằng route cho trang đăng nhập

  return (
    <>
      {!isLoginPage && <Header />}
      {!isLoginPage && <Navigation />}
      <main>
        {!isLoginPage && <Banner />}
        {children}
      </main>
      {!isLoginPage && <Footer />}
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
              {publicRoutes.map((route) => {
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
